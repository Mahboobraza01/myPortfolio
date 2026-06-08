const express = require('express');
const router = express.Router();

// ── Portfolio Data - Mahboob Raza ──────────────────────────────────
const portfolioData = {
  name: "Mahboob Raza",
  title: "Aspiring Full Stack Web Developer",
  tagline: "B.Tech CSE (May 2026) | MERN Stack | 200+ DSA Problems Solved 🚀",
  about: "I am a passionate Full Stack Developer (B.Tech CSE, May 2026) with hands-on experience in building responsive web applications using modern technologies.I specialize in creating responsive web applications and have practical experience with HTML, CSS, JavaScript, React, Node.js, Express.js, and PHP. I have implemented REST APIs, databases, and user authentication in real-world projects. Additionally, I have solved over 300 DSA problems in Java, which reflects my strong problem-solving skills and coding proficiency.",

  stats: [
    { number: "3+", label: "Real Projects" },
    { number: "300+", label: "DSA Problems Solved" },
    { number: "8.2", label: "CGPA" },
    { number: "2+", label: "Internships" }
  ],

  skills: [
    { name: "HTML / CSS", level: 92, icon: "🌐" },
    { name: "JavaScript", level: 85, icon: "⚡" },
    { name: "React.js", level: 80, icon: "⚛️" },
    { name: "Node.js", level: 80, icon: "🟢" },
    { name: "Express.js", level: 80, icon: "🚂" },
    { name: "MongoDB", level: 72, icon: "🍃" },
    { name: "PHP / MySQL", level: 68, icon: "🐘" },
    { name: "Java (DSA)", level: 75, icon: "☕" },
    { name: "Bootstrap", level: 85, icon: "🎨" },
    { name: "REST APIs", level: 80, icon: "🔗" }
  ],

  projects: [
    {
      title: "Wanderlust – Booking Web App",
      desc: "Full-stack accommodation booking platform with user authentication, CRUD listings, image uploads, reviews, aur AI-based price suggestions for better booking experience.",
      tech: ["Node.js", "Express.js", "EJS", "MongoDB"],
      github: "https://github.com/Mahboobraza01/wanderlust",
      live: "https://wanderlust-2i83.onrender.com/listings",
      emoji: "🏕️"
    },
    {
      title: "PG Life – PG Accommodation Website",
      desc: "Responsive PG accommodation website with city-wise search & filtering. Frontend React se, backend PHP + MySQL se banaya aur REST APIs integrate kiye.",
      tech: ["React", "PHP", "MySQL", "Bootstrap"],
      github: "https://github.com/Mahboobraza01/PG-life",
      live: "https://mahboob-portfolio.infinityfreeapp.com/pglife/index.php",
      emoji: "🏠"
    },
    {
      title: "Real-time Weather Telegram Bot",
      desc: "Node.js se banaya real-time weather bot jo Telegram API aur OpenWeatherMap API integrate karta hai. Kisi bhi city ka live weather milta hai instantly.",
      tech: ["Node.js", "Telegram API", "OpenWeatherMap API"],
      github: "https://github.com/Mahboobraza01/weathet-bot",
      live: "https://web.telegram.org/k/#@WeatherBabaBot",
      emoji: "🌤️"
    },
    {
      title: "Portfolio Website",
      desc: "Yeh hi portfolio website jo Node.js, Express.js aur EJS se banai gayi hhttps://github.comai — dark theme aur fully responsive.",
      tech: ["Node.js", "Express.js", "EJS", "CSS"],
      github: "https://github.com",
      live: "#",
      emoji: "🎨"
    }
  ],

  experience: [
    {
      role: "Full Stack Website Design & Development (Virtual)",
      company: "Internship Studio (Remote)",
      duration: "Jan 2026 – Present",
      points: [
        "HTML, CSS, JavaScript, Bootstrap aur React mein structured virtual training complete ki",
        "Capstone assignment ke roop mein responsive e-commerce website design aur develop kar raha hoon",
        "Real-world project workflow aur best practices seekhi"
      ]
    },
    {
      role: "Web Development with AI (Virtual)",
      company: "Internshala Training (Remote)",
      duration: "Oct 2024 – Dec 2024",
      points: [
        "HTML, CSS, JavaScript, PHP, MySQL aur React mein hands-on experience haasil kiya",
        "City-wise search aur filtering ke saath responsive PG accommodation website banaya",
        "AI tools ko web development workflow mein integrate karna seekha",
        "Certificate: Web Development with AI – Internshala (Sep 2025)"
      ]
    },
    {
      role: "B.Tech – Computer Science & Engineering",
      company: "Gurukula Kangri (Deemed to be University), Haridwar",
      duration: "Nov 2022 – May 2026",
      points: [
        "CGPA: 8.2 — consistent academic performance",
        "Core subjects: Data Structures, Algorithms, DBMS, OS, Web Technologies",
        "200+ DSA problems solved on LeetCode aur GeeksForGeeks using Java"
      ]
    }
  ],

  certifications: [
    { name: "Web Development with AI", issuer: "Internshala", date: "Sep 2025" }
  ],

  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com"
  },

  email: "mahboobraza.muz@gmail.com",
  phone: "+91 6200548714",
  location: "Haridwar, Uttarakhand"
};

// ── Routes ─────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('index', { data: portfolioData, page: 'home' });
});

router.get('/about', (req, res) => {
  res.render('about', { data: portfolioData, page: 'about' });
});

router.get('/projects', (req, res) => {
  res.render('projects', { data: portfolioData, page: 'projects' });
});

router.get('/experience', (req, res) => {
  res.render('experience', { data: portfolioData, page: 'experience' });
});

module.exports = router;
module.exports.portfolioData = portfolioData;
