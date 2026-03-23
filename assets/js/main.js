(function () {
  'use strict';

  /* ── Intersection Observer for fade-up animations ── */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  /* ── Animate terminal log lines on load ── */
  document.querySelectorAll('.terminal__line').forEach((line, i) => {
    line.style.animationDelay = `${400 + i * 160}ms`;
  });

  /* ── Copy-to-clipboard for install block ── */
  const copyBtn = document.getElementById('copy-install');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = [
        'git clone https://github.com/moon0deva/CyberRemedy.git',
        'cd CyberRemedy',
        'python3 -m venv venv',
        'source venv/bin/activate',
        'pip install -r requirements.txt',
        'python main.py',
      ].join('\n');
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2200);
      });
    });
  }

  /* ── Smooth active nav highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  const highlightNav = () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle('nav__link--active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Live clock for terminal (optional decoration) ── */
  const clocks = document.querySelectorAll('.js-clock');
  const tick = () => {
    const t = new Date().toLocaleTimeString('en-GB', { hour12: false });
    clocks.forEach((el) => (el.textContent = t));
  };
  if (clocks.length) { tick(); setInterval(tick, 1000); }

  /* ── Mobile nav toggle ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('mobile-nav--open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

})();
