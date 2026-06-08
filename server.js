const express = require('express');
const path = require('path');
const app = express();

// ─── Template Engine ───────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Static Files ──────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ────────────────────────────────────────────────────────
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');

app.use('/', indexRouter);
app.use('/contact', contactRouter);

// ─── 404 Handler ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404');
});

// ─── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio running at http://localhost:${PORT}`);
});
