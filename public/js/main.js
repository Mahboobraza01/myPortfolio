// ─── HAMBURGER MENU ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close menu when link clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ─── SKILL BARS ANIMATION ──────────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
  skillFills.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
};

// Intersection Observer for skill bars
if (skillFills.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateSkills, 200);
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills-section') || document.querySelector('.skills-grid');
  if (skillsSection) observer.observe(skillsSection);
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────────
const revealElements = document.querySelectorAll('.project-card, .stat-card, .skill-card, .timeline-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  revealObserver.observe(el);
});

// ─── NAVBAR SCROLL EFFECT ──────────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(13,13,13,0.98)';
    } else {
      navbar.style.background = 'rgba(13,13,13,0.9)';
    }
  }
});

// ─── DSA TOGGLE ────────────────────────────────────────────────────
function toggleDSA(level) {
  const list  = document.getElementById('list-' + level);
  const arrow = document.getElementById('arrow-' + level);

  if (list.classList.contains('open')) {
    list.classList.remove('open');
    arrow.classList.remove('open');
  } else {
    list.classList.add('open');
    arrow.classList.add('open');
  }
}

// ─── SEQUENCE TEXT ANIMATION ───────────────────────────────────────
const words = ["Full Stack Developer", "MERN Stack Developer", "Software Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    el.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500; // ruko thoda
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

// Start karo
typeEffect();


// ─── COUNT UP ANIMATION ────────────────────────────────────────────
function countUp(el, target, duration = 1500) {
  const isDecimal = target % 1 !== 0;
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal 
      ? start.toFixed(1) + suffix 
      : Math.floor(start) + suffix;
  }, 16);
}

// Scroll pe trigger karo
const countEls = document.querySelectorAll('.count-up');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting && !el.target.dataset.counted) {
      el.target.dataset.counted = true;
      const target = parseFloat(el.target.dataset.target);
      countUp(el.target, target);
    }
  });
}, { threshold: 0.5 });

countEls.forEach(el => countObserver.observe(el));

console.log('🚀 Portfolio loaded! Happy coding!');
