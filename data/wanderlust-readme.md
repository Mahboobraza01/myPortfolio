<h1 align="center">🚀 Wanderlust — A MERN Stack Web App</h1>

<p align="center">
  ✈️ A full-featured travel booking and exploration web app built with <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MongoDB</strong>, <strong>EJS</strong>, and <strong>Cloudinary</strong> — featuring dynamic UI, authentication, cloud image uploads, and MVC architecture.
</p>

## 🔥 Features

- 🔐 Secure user authentication with **Passport.js**
- 🧾 Form validation using **Joi**
- ☁️ Cloud image uploads via **Cloudinary**
- 💬 Flash messages for real-time UI feedback
- 📦 Modular MVC architecture: **Controllers, Models, Routes, Views**
- 🌍 Dynamic pages rendered with **EJS**

---

## 📁 Project Structure

```
WanderNest/
│
├── controllers/       # Logic for each route
├── models/            # Mongoose schemas
├── routes/            # Express route files
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS, images)
├── utils/             # Helper functions
│
├── app.js             # Main Express server
├── cloudConfig.js     # Cloudinary setup
├── middleware.js      # Auth & error handlers
├── schema.js          # Joi validation schemas
├── .env               # Environment variables
└── README.md          # You're here!
```

---

## 🚀 Getting Started




### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root folder:

```env
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
SESSION_SECRET=your_custom_secret
```

### 4️⃣ Start the development server

```bash
npm start
```

Go to 👉 https://wanderlust-2i83.onrender.com/listings

## 🧠 Concepts You'll Learn

- MVC pattern with Express.js
- EJS templating engine
- Passport.js authentication
- MongoDB with Mongoose ORM
- Cloudinary integration for image uploads
- Flash messaging system
- Middleware-based validation (Joi)
- RESTful routing and modular structure


## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, fork, and contribute 💙

---

<p align="center">
  ⭐ If you found this project helpful or inspiring, please give it a star!
</p>