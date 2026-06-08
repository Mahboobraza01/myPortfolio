# 🚀 Portfolio Website - Node.js + Express.js

Ek clean, responsive portfolio website built with Node.js, Express.js aur EJS templating.

## 📁 Folder Structure

```
portfolio/
├── server.js              ← Main server file
├── package.json           ← Dependencies
├── routes/
│   ├── index.js           ← Home, About, Projects, Experience routes
│   └── contact.js         ← Contact form route
├── views/
│   ├── partials/
│   │   ├── header.ejs     ← Navbar
│   │   └── footer.ejs     ← Footer
│   ├── index.ejs          ← Home page
│   ├── about.ejs          ← About page
│   ├── projects.ejs       ← Projects page
│   ├── experience.ejs     ← Experience/Timeline page
│   ├── contact.ejs        ← Contact form page
│   └── 404.ejs            ← 404 error page
└── public/
    ├── css/style.css      ← All styles (dark theme + yellow)
    ├── js/main.js         ← Animations & interactions
    └── images/            ← Apni photos yahan rakhein
```

## ⚡ Setup Kaise Karein

### Step 1: Dependencies install karo
```bash
cd portfolio
npm install
```

### Step 2: Apna data update karo
`routes/index.js` file kholo aur `portfolioData` object mein apna data fill karo:
- Apna naam, title, about
- Skills aur unka level (0-100)
- Projects (title, description, tech stack, links)
- Experience / work history
- Social media links
- Email, phone, location

### Step 3: Server start karo
```bash
# Development mode (auto-restart on file change)
npm run dev

# Production mode
npm start
```

### Step 4: Browser mein kholo
```
http://localhost:3000
```

## 🎨 Customization

### Apni photo add karna:
1. Photo ko `public/images/profile.jpg` mein rakhein
2. `views/about.ejs` mein comment hata dein (line ~15)

### Colors change karna:
`public/css/style.css` ke top mein `:root` variables edit karein:
```css
:root {
  --yellow: #f5c518;  /* Main accent color */
  --bg-dark: #0d0d0d; /* Background */
}
```

### Email functionality add karna:
1. Nodemailer install karo: `npm install nodemailer`
2. `routes/contact.js` mein email config add karo

## 📦 Tech Stack
- **Backend**: Node.js + Express.js
- **Templating**: EJS
- **Styling**: Pure CSS (no frameworks)
- **Fonts**: Space Grotesk + JetBrains Mono

## 🚀 Deploy Karna (Free Options)

### Railway.app:
```bash
# railway.app pe account banao
# GitHub pe push karo
# Railway pe connect karo - automatic deploy!
```

### Render.com:
- GitHub repo connect karo
- Build Command: `npm install`
- Start Command: `node server.js`

### Vercel (with serverless):
```bash
npm install -g vercel
vercel --prod
```

---
Made with ❤️ | Happy Coding! 🚀
