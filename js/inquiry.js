

const PUBLIC_EMAIL = 'hello@fleurrose2am.com';

function showToast(message = 'Email copied to clipboard!') {
  let toast = document.getElementById('copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

function copyEmailToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PUBLIC_EMAIL).then(() => {
      showToast('hello@fleurrose2am.com copied!');
    }).catch(() => {
      promptFallback();
    });
  } else {
    promptFallback();
  }
}

function promptFallback() {
  window.prompt('Copy email address:', PUBLIC_EMAIL);
}

function generateMailto(subject = 'Inquiry', body = '') {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `mailto:Fleur Rose <${PUBLIC_EMAIL}>?subject=${encSubject}&body=${encBody}`;
}

window.Inquiry = {
  email: PUBLIC_EMAIL,
  copy: copyEmailToClipboard,
  mailto: generateMailto,
  toast: showToast
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  });
});
