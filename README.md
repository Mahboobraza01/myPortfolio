# 🚀 Mahboob Raza | Personal Portfolio Website

A modern, fully responsive personal portfolio website built with **Node.js**, **Express.js**, and **EJS** templating engine. Features a sleek dark theme with yellow accents, typewriter animation, count-up animations, DSA problem tracker with 300+ LeetCode problems, animated skill bars, and a working contact form.

---

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Portfolio-yellow?style=for-the-badge&logo=render)](https://my-portfolio-tltd.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Mahboobraza01/myPortfolio)

---

## 📸 Preview

> Add screenshot here

---

## ✨ Features

- 🌙 **Dark Theme** — Professional dark UI with yellow accent colors
- 📱 **Fully Responsive** — Mobile, Tablet, Desktop ready
- ⌨️ **Typewriter Animation** — Animated role titles in hero section
- 🔢 **Count-Up Animation** — Numbers animate on scroll (Stats + DSA cards)
- 🧠 **DSA Problem Tracker** — 300+ LeetCode problems (Easy / Medium / Hard) with direct links, slide-open list
- 📊 **Animated Skill Bars** — Scroll-triggered progress bars
- 🎯 **Scroll Reveal** — Cards animate as user scrolls
- 📬 **Contact Form** — Nodemailer email integration
- 🗂️ **5 Pages** — Home, About, Projects, Experience, Contact
- 🧭 **Sticky Navbar** — Hamburger menu on mobile
- 🔗 **Project Showcase** — Live demo + GitHub links
- 📅 **Experience Timeline** — Internships + Education

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Templating** | EJS (Embedded JavaScript) |
| **Styling** | Pure CSS (Custom Properties, Flexbox, Grid) |
| **Animations** | CSS Keyframes + Vanilla JavaScript |
| **Email** | Nodemailer (Gmail SMTP) |
| **Fonts** | Space Grotesk + JetBrains Mono |
| **Icons** | Font Awesome 6 |
| **Deployment** | Render.com |

---

## 📁 Project Structure

```
portfolio/
├── server.js                  ← Main Express server (entry point)
├── package.json               ← Project metadata and dependencies
├── README.md                  ← You are here!
│
├── routes/
│   ├── index.js               ← All portfolio data + page routes
│   └── contact.js             ← Contact form handler + Nodemailer
│
├── views/
│   ├── partials/
│   │   ├── header.ejs         ← Navbar + HTML head
│   │   └── footer.ejs         ← Footer + social links + scripts
│   ├── index.ejs              ← Home (Hero, Stats, DSA, Skills, Projects)
│   ├── about.ejs              ← About page
│   ├── projects.ejs           ← All projects
│   ├── experience.ejs         ← Timeline
│   ├── contact.ejs            ← Contact form
│   └── 404.ejs                ← Custom 404 page
│
└── public/
    ├── css/style.css          ← All styles
    ├── js/main.js             ← Animations & interactions
    └── images/                ← Assets
```

---

## ⚡ Run Locally

### Prerequisites
- Node.js v14+
- npm
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Mahboobraza01/myPortfolio.git

# 2. Go into the folder
cd myPortfolio

# 3. Install dependencies
npm install

# 4. Start dev server (auto-restart)
npm run dev

# 5. Open browser
http://localhost:3000
```

### Production
```bash
npm start
```

---

## 📧 Contact Form Email Setup

### Step 1 — Install Nodemailer
```bash
npm install nodemailer
```

### Step 2 — Get Gmail App Password
1. [myaccount.google.com](https://myaccount.google.com) → Security
2. 2-Step Verification → ON
3. Search **"App Passwords"** → Generate
4. Copy 16-character password

### Step 3 — Update `routes/contact.js`
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mahboobraza.muz@gmail.com',
    pass: 'xxxx xxxx xxxx xxxx'  // App Password
  }
});
```

---

## 🧠 DSA Problem Tracker

300+ solved LeetCode problems stored in `routes/index.js`:

```javascript
dsaProblems: {
  easy:   { questions: [ { name: "1. Two Sum", link: "https://leetcode.com/problems/two-sum/" }, ... ] },
  medium: { questions: [ ... ] },
  hard:   { questions: [ ... ] }
}
```

### Add a new question:
```javascript
{ name: "Problem Name", link: "https://leetcode.com/problems/slug/" },
```

**Count updates automatically** — no other changes needed! ✅

---

## 🎨 Customization

### Change accent color
```css
/* public/css/style.css */
:root {
  --yellow: #f5c518;   /* accent color */
  --bg-dark: #0d0d0d;  /* background */
}
```

### Add profile photo
1. Put photo at `public/images/profile.jpg`
2. In `views/about.ejs` — uncomment the `<img>` tag

### Update your data
Everything in `routes/index.js` → `portfolioData`:
- Name, title, tagline, about
- Skills + levels
- Projects + links
- Experience + education
- Social links + contact info

---

## 🚀 Deployment

### ✅ Deployed on Render.com

| Setting | Value |
|---|---|
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Environment | Node |

### Steps:
1. Push to GitHub
2. Connect repo on [render.com](https://render.com)
3. Set build + start commands
4. Deploy! 🎉

---

## 🔄 Update & Redeploy

```bash
git add .
git commit -m "your update message"
git push
```

Render **auto-redeploys** on every push! ✅

---

## 📄 Pages

| Page | Route | Content |
|---|---|---|
| Home | `/` | Hero, Stats, DSA Tracker, Skills, Projects |
| About | `/about` | Bio, photo, contact info |
| Projects | `/projects` | All projects with links |
| Experience | `/experience` | Internships + education timeline |
| Contact | `/contact` | Contact form |
| 404 | `*` | Custom error page |

---

## 🏆 Projects Showcased

| Project | Tech | Live |
|---|---|---|
| **Wanderlust** — Booking Platform | Node.js, Express, EJS, MongoDB | [Live](https://wanderlust-2i83.onrender.com/listings) |
| **InterviewIQ.AI** — AI Mock Interview | Node.js, React, MongoDB, Razorpay | [Live](https://ai-agent-project-client.onrender.com/) |
| **PG Life** — PG Accommodation | React, PHP, MySQL, Bootstrap | [Live](https://mahboob-portfolio.infinityfreeapp.com/pglife/) |

---

## 👨‍💻 About Me

**Mahboob Raza** — Aspiring Full Stack Web Developer

- 🎓 B.Tech CSE — Gurukula Kangri University (May 2026)
- 📍 Haridwar, Uttarakhand, India
- 💼 CGPA: 8.2
- 🧠 300+ DSA problems — LeetCode & GFG
- 💪 Internships: Internship Studio & Internshala

---

## 📬 Connect

| Platform | Link |
|---|---|
| 🌐 Portfolio | [my-portfolio-tltd.onrender.com](https://my-portfolio-tltd.onrender.com) |
| 📧 Email | mahboobraza.muz@gmail.com |
| 💼 LinkedIn | [linkedin.com/in/mahboobraza](https://www.linkedin.com/in/mahboobraza/) |
| 🐙 GitHub | [github.com/Mahboobraza01](https://github.com/Mahboobraza01) |

---

## 📄 License

MIT License — open source, feel free to use!

---

<div align="center">

Made with ❤️ by **Mahboob Raza**

⭐ **Star this repo if you liked it!** ⭐

</div>
