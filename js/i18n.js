let currentStrings = {};

async function loadLanguage(lang) {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load lang/${lang}.json`);
    currentStrings = await res.json();
    window.__i18nStrings = currentStrings;
  } catch (e) {
    console.error('i18n load error:', e);
    return;
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (currentStrings[key] !== undefined) el.textContent = currentStrings[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (currentStrings[key] !== undefined) el.placeholder = currentStrings[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (currentStrings[key] !== undefined) el.innerHTML = currentStrings[key];
  });

  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Update active state on lang buttons
  document.querySelectorAll('.lang-btn, .nav-overlay-lang button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initLanguage() {
  const saved = localStorage.getItem('lang') || 'en';
  loadLanguage(saved);
}

// expose globally so nav onclick can call it
window.loadLanguage = loadLanguage;
window.initLanguage = initLanguage;
