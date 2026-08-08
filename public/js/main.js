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


console.log('🚀 Portfolio loaded! Happy coding!');
