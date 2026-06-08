const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const portfolioData = require('./index').portfolioData;

// ── Email Config ───────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mahboobraza.muz@gmail.com',  // Tera Gmail
    pass: 'gfdo nljy ushx ecca'          // App Password (Gmail wala)
  }
});

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

  if (!name || !email || !message) {
    return res.render('contact', {
      data: portfolioData,
      page: 'contact',
      success: null,
      error: 'Saare fields fill karo bhai! 😅'
    });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <mahboobraza.muz@gmail.com>`,
      to: 'mahboobraza.muz@gmail.com',   // Tujhe mail aayega yahan
      replyTo: email,                     // Reply karo to sender ko jayega
      subject: `Portfolio: ${subject || 'New Message'} - ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || 'N/A'}</p>
        <p><b>Message:</b><br>${message}</p>
      `
    });

    res.render('contact', {
      data: portfolioData,
      page: 'contact',
      success: `Thanks ${name}! Tera message mil gaya. Main jald hi reply karunga! 🙌`,
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