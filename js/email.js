/* ─────────────────────────────────────────────────────────────
   EMAILJS HANDLER
   Extracted from cig-website.html & pages/challenge.html
   ───────────────────────────────────────────────────────────── */

/* ─── CONFIGURATION ─────────────────────────────────────────── */

const EMAILJS_PUBLIC_KEY   = 'aLzDsp1SCGw-LgW-z';
const EMAILJS_SERVICE_ID  = 'service_tdvn7x8';
const EMAILJS_TEMPLATE_ID = 'template_34y2qdf';

/* ─── INITIALIZATION ────────────────────────────────────────── */

(function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('[EmailJS] library not loaded');
    return;
  }

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
})();

/* ─── REGISTRATION HANDLER ──────────────────────────────────── */

async function handleRegister() {
  const handleInput = document.getElementById('reg-handle');
  const emailInput  = document.getElementById('reg-email');
  const langInput   = document.getElementById('reg-lang');

  const confirmBox = document.getElementById('reg-confirm');
  const errorBox   = document.getElementById('reg-error');

  if (!handleInput || !emailInput || !langInput) {
    console.error('[EmailJS] Registration fields missing');
    return;
  }

  const handle  = handleInput.value.trim();
  const email   = emailInput.value.trim();
  const language = langInput.value.trim();

  if (confirmBox) confirmBox.style.display = 'none';
  if (errorBox) errorBox.style.display = 'none';

  /* ─── BASIC VALIDATION ───────────────── */

  if (!handle || !email || !language) {
    if (errorBox) {
      errorBox.textContent = '✖ ALL FIELDS ARE REQUIRED';
      errorBox.style.display = 'block';
    }
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (errorBox) {
      errorBox.textContent = '✖ INVALID EMAIL ADDRESS';
      errorBox.style.display = 'block';
    }
    return;
  }

  /* ─── SEND EMAIL ─────────────────────── */

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        handle: handle,
        email: email,
        language: language,
        challenge: 'Edition 19 — Adversarial Graph Traversal'
      }
    );

    if (confirmBox) {
      confirmBox.textContent = '✔ REGISTRATION RECEIVED — CHECK YOUR INBOX';
      confirmBox.style.display = 'block';
    }

    // Reset fields
    handleInput.value = '';
    emailInput.value = '';
    langInput.value = '';

  } catch (err) {
    console.error('[EmailJS] Send failed:', err);

    if (errorBox) {
      errorBox.textContent = '✖ SEND FAILED — PLEASE TRY AGAIN';
      errorBox.style.display = 'block';
    }
  }
}