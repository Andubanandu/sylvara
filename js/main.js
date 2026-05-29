/* ============================================================
   main.js — shared across all pages
   ============================================================ */

// ── Component injection ──────────────────────────────────────
async function injectComponents() {
  const [navRes, footerRes] = await Promise.all([
    fetch('/components/nav.html'),
    fetch('/components/footer.html'),
  ]);
  const [navHtml, footerHtml] = await Promise.all([
    navRes.text(),
    footerRes.text(),
  ]);

  const navRoot = document.getElementById('nav-root');
  const footerRoot = document.getElementById('footer-root');
  if (navRoot) navRoot.innerHTML = navHtml;
  if (footerRoot) footerRoot.innerHTML = footerHtml;

  initLanguage();       // from i18n.js — swap text after DOM is ready
  setActiveNavLink();
  initMobileMenu();
}

// ── Active nav link ──────────────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('[data-navlink]').forEach(link => {
    const page = link.dataset.navlink;
    const isActive =
      (page === 'services' && path.includes('services')) ||
      (page === 'work' && path.includes('portfolio')) ||
      (page === 'about' && path.includes('about')) ||
      (page === 'contact' && path.includes('contact'));
    link.classList.toggle('active', isActive);
  });
}

// ── Mobile menu ──────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('nav-overlay-close');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !overlay) return;

  function openMenu() {
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.querySelectorAll('a, button')[0]?.focus();
  }
  function closeMenu() {
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ── Scroll reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => observer.observe(el));
}

// ── Portfolio filter ──────────────────────────────────────────
function initPortfolioFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ── Stats counter ─────────────────────────────────────────────
function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count-to]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.countSuffix || '';
      const duration = 1200;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = Math.round(value) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// ── Contact form ──────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(input, msgKey) {
    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.field-error');
    if (group) group.classList.add('has-error');
    if (errorEl) {
      const strings = window.__i18nStrings || {};
      errorEl.textContent = strings[msgKey] || input.dataset.errorFallback || 'Required.';
      errorEl.style.display = 'block';
    }
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    if (group) group.classList.remove('has-error');
    const errorEl = group?.querySelector('.field-error');
    if (errorEl) errorEl.style.display = 'none';
  }

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => clearError(el));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const service = form.querySelector('#service');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { showError(name, 'contact.form.error.name'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showError(email, 'contact.form.error.email'); valid = false; }
    if (!service.value) { showError(service, 'contact.form.error.service'); valid = false; }
    if (!message.value.trim()) { showError(message, 'contact.form.error.message'); valid = false; }

    if (!valid) return;

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;

    // Simulate submission (owner wires up Formspree / Netlify Forms endpoint here)
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.classList.add('visible');
    }, 800);
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await injectComponents();
  initScrollReveal();
  initPortfolioFilter();
  initStatsCounter();
  initContactForm();
});
