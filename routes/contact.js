const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const portfolioData = require('./index').portfolioData;

const mailUser = process.env.CONTACT_EMAIL;
const mailPassword = process.env.CONTACT_EMAIL_PASSWORD;
const transporter = mailUser && mailPassword
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: mailUser, pass: mailPassword }
    })
  : null;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

router.get('/', (req, res) => {
  res.render('contact', { 
    data: portfolioData,
    page: 'contact',
    success: null,
    error: null
  });
});

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (!cleanName || !cleanEmail || !cleanMessage ||
      cleanName.length > 120 || cleanEmail.length > 254 ||
      cleanSubject.length > 200 || cleanMessage.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.render('contact', {
      data: portfolioData,
      page: 'contact',
      success: null,
      error: 'Please enter a valid email and keep each field within its length limit.'
    });
  }

  if (!transporter) {
    return res.status(503).render('contact', {
      data: portfolioData,
      page: 'contact',
      success: null,
      error: 'Email delivery is not configured yet. Please contact me using the email address shown here.'
    });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${mailUser}>`,
      to: mailUser,
      replyTo: cleanEmail,
      subject: `Portfolio: ${cleanSubject || 'New Message'} - ${cleanName}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${escapeHtml(cleanName)}</p>
        <p><b>Email:</b> ${escapeHtml(cleanEmail)}</p>
        <p><b>Subject:</b> ${escapeHtml(cleanSubject || 'N/A')}</p>
        <p><b>Message:</b><br>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>
      `
    });

    res.render('contact', {
      data: portfolioData,
      page: 'contact',
      success: `Thanks ${cleanName}! Your message has been received. I'll reply soon.`,
      error: null
    });

  } catch (err) {
    console.error(err);
    res.render('contact', {
      data: portfolioData,
      page: 'contact',
      success: null,
      error: 'Mail send nahi hua, baad mein try karo! 😓'
    });
  }
});

module.exports = router;
