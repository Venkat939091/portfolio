/* ============================================================
   PRATAP PORTFOLIO — main.js
   ============================================================ */

/* ── 1. SCROLL FADE-IN OBSERVER ─────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
}

/* ── 2. PARTICLE GENERATOR ──────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = [
    'rgba(124,107,255,0.6)',
    'rgba(233,107,255,0.5)',
    'rgba(107,255,212,0.5)',
  ];

  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width:            ${size}px;
      height:           ${size}px;
      left:             ${Math.random() * 100}%;
      top:              ${Math.random() * 100}%;
      background:       ${color};
      animation-duration:  ${Math.random() * 15 + 8}s;
      animation-delay:     ${Math.random() * 10}s;
      box-shadow:       0 0 ${size * 3}px ${color};
    `;

    container.appendChild(p);
  }
}

/* ── 3. ACTIVE NAV LINK HIGHLIGHT ───────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], #contact');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ── 4. TYPED ROLE ANIMATION ────────────────────────────────── */
function initTypedRole() {
  const el = document.querySelector('.hero-role');
  if (!el) return;

  const roles = [
    'Python Full Stack Developer',
    'Django & React.js Engineer',
    'AI & Data Science Graduate',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const SPEED_TYPE   = 65;
  const SPEED_DELETE = 35;
  const PAUSE_END    = 2000;
  const PAUSE_START  = 400;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, --charIndex);
    } else {
      el.textContent = current.slice(0, ++charIndex);
    }

    let delay = isDeleting ? SPEED_DELETE : SPEED_TYPE;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_END;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = PAUSE_START;
    }

    setTimeout(type, delay);
  }

  // Start after hero animation settles
  setTimeout(type, 1400);
}

/* ── 5. SMOOTH SCROLL FOR NAV LINKS ────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── 6. NAVBAR SCROLL GLASS EFFECT ─────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(5,7,20,0.92)';
      nav.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      nav.style.background = 'rgba(5,7,20,0.75)';
      nav.style.boxShadow  = 'none';
    }
  });
}

/* ── 7. TILT EFFECT ON PROJECT CARDS ───────────────────────── */
function initCardTilt() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) *  6;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── 8. SKILL CELL STAGGER ON SCROLL ───────────────────────── */
function initSkillStagger() {
  const cells = document.querySelectorAll('.skill-cell');
  cells.forEach((cell, i) => {
    cell.style.transitionDelay = `${i * 60}ms`;
  });
}

/* ── 9. CURSOR GLOW (desktop only) ─────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,107,255,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ── BOOT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollAnimations();
  initActiveNav();
  initTypedRole();
  initSmoothScroll();
  initNavScroll();
  initCardTilt();
  initSkillStagger();
  initCursorGlow();
});
