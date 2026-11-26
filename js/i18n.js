

const STORAGE_KEY = 'fleurrose-lang';
let currentLang = 'en';
let translationData = null;

function getInitialLang() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'en' || langParam === 'fr') {
      return langParam;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') {
      return saved;
    }
  } catch (e) {
    console.warn('Storage access restricted', e);
  }
  return /^fr/i.test(navigator.language || '') ? 'fr' : 'en';
}

async function loadTranslations() {
  if (translationData) return translationData;
  try {
    const res = await fetch('data/translations.json');
    translationData = await res.json();
    return translationData;
  } catch (err) {
    console.error('Failed to load translations.json', err);
    return null;
  }
}

function getTranslation(key, lang = currentLang) {
  if (!translationData || !translationData[lang]) return null;
  const parts = key.split('.');
  let val = translationData[lang];
  for (const p of parts) {
    if (val && val[p] !== undefined) {
      val = val[p];
    } else {
      return null;
    }
  }
  return val;
}

function applyTranslations() {
  if (!translationData) return;
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getTranslation(key);
    if (val !== null && typeof val === 'string') {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'fr') return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {}
  applyTranslations();
}

document.addEventListener('DOMContentLoaded', async () => {
  currentLang = getInitialLang();
  await loadTranslations();
  applyTranslations();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      setLanguage(targetLang);
    });
  });
});

window.I18N = {
  getLang: () => currentLang,
  setLang: setLanguage,
  t: getTranslation,
  load: loadTranslations,
  apply: applyTranslations
};
