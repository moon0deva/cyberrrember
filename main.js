// ═══════════════════════════════════════════
//  CyberRemedy — AID-ARS v4.0
//  main.js
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

    // ─── Fade-in on scroll ───────────────────
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


    // ─── Animated counters ───────────────────
    function animateCounter(el, target) {
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(interval);
        }, 30);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('.stat-number[data-target]');
                nums.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) statsObserver.observe(statsEl);


    // ─── Nav active link highlight ───────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.style.color = 'var(--green)';
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => navObserver.observe(s));


    // ─── Ticker pause on hover ───────────────
    const tickerInner = document.querySelector('.ticker-inner');
    if (tickerInner) {
        tickerInner.addEventListener('mouseenter', () => {
            tickerInner.style.animationPlayState = 'paused';
        });
        tickerInner.addEventListener('mouseleave', () => {
            tickerInner.style.animationPlayState = 'running';
        });
    }


    // ─── Typing cursor blink in terminal ─────
    const cursor = document.querySelector('.t-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }


    // ─── Smooth scroll for anchor links ──────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
