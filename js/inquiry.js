const PUBLIC_EMAIL = 'hello@fleurrose2am.com';
const WEB3FORMS_KEY = '07353104-1f37-4618-8f62-bf76f3a1ebe1';

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
      const isFr = window.I18N && window.I18N.getLang() === 'fr';
      showToast(isFr ? 'hello@fleurrose2am.com copié !' : 'hello@fleurrose2am.com copied!');
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

function createInquiryModal() {
  if (document.getElementById('inquiry-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'inquiry-modal';
  modal.className = 'inquiry-modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'inq-modal-title');

  modal.innerHTML = `
    <div class="inquiry-modal-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; border-bottom:1px solid #2A2A2E; padding-bottom:14px;">
        <div>
          <div id="inq-modal-kicker" class="font-mono" style="font-size:10.5px; letter-spacing:0.16em; color:#FF8FC7;">FLEUR ROSE · DIRECT INQUIRY</div>
          <h2 id="inq-modal-title" class="font-marker" style="margin:6px 0 0; font-size:clamp(24px, 3.2vw, 34px); line-height:1.05; color:#F3F1EC;">TALK TO ME</h2>
        </div>
        <button type="button" id="inq-modal-close" aria-label="Close" style="background:none; border:0; color:#8E8C86; cursor:pointer; padding:6px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <form id="inq-modal-form" style="display:flex; flex-direction:column; gap:14px;">
        <input type="hidden" name="access_key" value="${WEB3FORMS_KEY}">
        <input type="hidden" name="from_name" value="FLEUR ROSE Website">
        <input type="checkbox" name="botcheck" style="display:none;">

        <label style="display:flex; flex-direction:column; gap:6px;">
          <span id="inq-lbl-subject" class="font-mono" style="font-size:10.5px; letter-spacing:0.12em; color:#8E8C86;">SUBJECT / ARTWORK</span>
          <input type="text" id="inq-field-subject" name="subject" class="inquiry-input" required>
        </label>

        <label style="display:flex; flex-direction:column; gap:6px;">
          <span id="inq-lbl-name" class="font-mono" style="font-size:10.5px; letter-spacing:0.12em; color:#8E8C86;">YOUR NAME</span>
          <input type="text" id="inq-field-name" name="name" class="inquiry-input" required>
        </label>

        <label style="display:flex; flex-direction:column; gap:6px;">
          <span id="inq-lbl-email" class="font-mono" style="font-size:10.5px; letter-spacing:0.12em; color:#8E8C86;">YOUR EMAIL</span>
          <input type="email" id="inq-field-email" name="email" class="inquiry-input" required>
        </label>

        <label style="display:flex; flex-direction:column; gap:6px;">
          <span id="inq-lbl-msg" class="font-mono" style="font-size:10.5px; letter-spacing:0.12em; color:#8E8C86;">MESSAGE</span>
          <textarea id="inq-field-msg" name="message" rows="4" class="inquiry-input" style="resize:vertical;" required></textarea>
        </label>

        <div id="inq-form-status" class="font-mono" style="display:none; font-size:11.5px; line-height:1.6; padding:12px; border:1px solid #2A2A2E;"></div>

        <div class="inquiry-actions">
          <button type="submit" id="inq-submit-btn" class="inquiry-btn-submit">SEND MESSAGE &rarr;</button>
          <button type="button" id="inq-copy-fallback" class="font-mono" title="Copy email address" aria-label="Copy hello@fleurrose2am.com" style="background:none; border:0; border-bottom:1px solid #5A5851; color:#8E8C86; font-size:11px; letter-spacing:0.06em; cursor:pointer; padding:4px 0; display:inline-flex; align-items:center; gap:7px;">
            <span>hello@fleurrose2am.com</span>
            <span id="inq-copy-icon" style="display:inline-flex; align-items:center;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </span>
          </button>
        </div>
      </form>

      <div id="inq-success-view" style="display:none; flex-direction:column; gap:16px; padding:12px 0;">
        <div class="font-mono" style="font-size:11px; letter-spacing:0.16em; color:#FF8FC7;" id="inq-success-kicker">MESSAGE SENT</div>
        <p class="font-hand" id="inq-success-msg" style="margin:0; font-size:clamp(20px, 2.2vw, 26px); font-weight:700; line-height:1.35; color:#F3F1EC;">Thank you! Your message has been sent. Fleur Rose will reply personally.</p>
        <button type="button" id="inq-success-close" class="inquiry-btn-submit" style="align-self:flex-start;">CLOSE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('inq-modal-close').addEventListener('click', closeInquiryModal);
  document.getElementById('inq-success-close').addEventListener('click', closeInquiryModal);
  document.getElementById('inq-copy-fallback').addEventListener('click', () => {
    copyEmailToClipboard();
    const iconWrap = document.getElementById('inq-copy-icon');
    const copyBtn = document.getElementById('inq-copy-fallback');
    if (iconWrap) {
      const originalSvg = iconWrap.innerHTML;
      iconWrap.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF8FC7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      if (copyBtn) copyBtn.style.color = '#FF8FC7';
      setTimeout(() => {
        iconWrap.innerHTML = originalSvg;
        if (copyBtn) copyBtn.style.color = '#8E8C86';
      }, 2400);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeInquiryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeInquiryModal();
    }
  });

  document.getElementById('inq-modal-form').addEventListener('submit', handleInquirySubmit);
}

function updateModalLanguage(subjectText) {
  const isFr = window.I18N && window.I18N.getLang() === 'fr';
  document.getElementById('inq-modal-kicker').textContent = isFr ? 'FLEUR ROSE · DEMANDE DIRECTE' : 'FLEUR ROSE · DIRECT INQUIRY';
  document.getElementById('inq-modal-title').textContent = isFr ? 'ÉCRIRE À FLEUR ROSE' : 'TALK TO ME';
  document.getElementById('inq-modal-close').setAttribute('aria-label', isFr ? 'Fermer' : 'Close');
  document.getElementById('inq-lbl-subject').textContent = isFr ? 'OBJET / ŒUVRE' : 'SUBJECT / ARTWORK';
  document.getElementById('inq-lbl-name').textContent = isFr ? 'VOTRE NOM' : 'YOUR NAME';
  document.getElementById('inq-lbl-email').textContent = isFr ? 'VOTRE E-MAIL' : 'YOUR EMAIL';
  document.getElementById('inq-lbl-msg').textContent = isFr ? 'MESSAGE' : 'MESSAGE';
  document.getElementById('inq-submit-btn').textContent = isFr ? 'ENVOYER LE MESSAGE →' : 'SEND MESSAGE →';
  document.getElementById('inq-success-kicker').textContent = isFr ? 'MESSAGE ENVOYÉ' : 'MESSAGE SENT';
  document.getElementById('inq-success-msg').textContent = isFr
    ? 'Merci ! Votre message a bien été envoyé. Fleur Rose vous répondra personnellement.'
    : 'Thank you! Your message has been sent. Fleur Rose will reply personally.';
  document.getElementById('inq-success-close').textContent = isFr ? 'FERMER' : 'CLOSE';

  const msgField = document.getElementById('inq-field-msg');
  if (msgField) {
    msgField.placeholder = isFr ? 'Votre message, question ou demande de disponibilité...' : 'Your message, question or availability inquiry...';
  }

  const subjectField = document.getElementById('inq-field-subject');
  if (subjectField) {
    subjectField.value = subjectText || (isFr ? 'Demande d’information — Fleur Rose' : 'Inquiry — Fleur Rose');
  }
}

function openInquiryModal(subjectText = '') {
  createInquiryModal();
  updateModalLanguage(subjectText);

  const statusEl = document.getElementById('inq-form-status');
  const submitBtn = document.getElementById('inq-submit-btn');
  const formEl = document.getElementById('inq-modal-form');
  const successEl = document.getElementById('inq-success-view');
  if (formEl) formEl.style.display = 'flex';
  if (successEl) successEl.style.display = 'none';
  if (statusEl) {
    statusEl.style.display = 'none';
    statusEl.textContent = '';
  }
  if (submitBtn) {
    submitBtn.disabled = false;
  }

  const modal = document.getElementById('inquiry-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const nameInput = document.getElementById('inq-field-name');
    if (nameInput) nameInput.focus();
  }, 150);
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

async function handleInquirySubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById('inq-submit-btn');
  const statusEl = document.getElementById('inq-form-status');
  const isFr = window.I18N && window.I18N.getLang() === 'fr';

  submitBtn.disabled = true;
  submitBtn.textContent = isFr ? 'ENVOI EN COURS...' : 'SENDING...';
  statusEl.style.display = 'none';

  const formData = new FormData(form);
  const jsonPayload = JSON.stringify(Object.fromEntries(formData));

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: jsonPayload
    });
    const data = await res.json();

    if (res.ok && data.success) {
      form.reset();
      form.style.display = 'none';
      const successEl = document.getElementById('inq-success-view');
      if (successEl) successEl.style.display = 'flex';
      setTimeout(() => {
        closeInquiryModal();
      }, 2800);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    statusEl.style.display = 'block';
    statusEl.style.borderColor = '#ff5a5a';
    statusEl.style.color = '#ff8a8a';
    statusEl.textContent = isFr
      ? 'Erreur lors de l’envoi. Veuillez copier l’adresse hello@fleurrose2am.com.'
      : 'Could not send right now. Please copy hello@fleurrose2am.com instead.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = isFr ? 'ENVOYER LE MESSAGE →' : 'SEND MESSAGE →';
  }
}

window.Inquiry = {
  email: PUBLIC_EMAIL,
  copy: copyEmailToClipboard,
  mailto: generateMailto,
  toast: showToast,
  open: openInquiryModal,
  close: closeInquiryModal
};

document.addEventListener('DOMContentLoaded', () => {
  createInquiryModal();

  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-copy-email]');
    if (copyBtn) {
      e.preventDefault();
      copyEmailToClipboard();
      return;
    }

    const mailLink = e.target.closest('a[href^="mailto:"]');
    if (mailLink) {
      e.preventDefault();
      let subject = '';
      try {
        const href = mailLink.getAttribute('href');
        const qIndex = href.indexOf('?');
        if (qIndex !== -1) {
          const params = new URLSearchParams(href.slice(qIndex + 1));
          subject = params.get('subject') || '';
        }
      } catch (err) {}
      openInquiryModal(subject);
    }
  });
});
