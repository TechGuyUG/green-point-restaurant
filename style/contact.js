// Contact Form — Formspree Integration
(function () {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  // Change form action to Formspree
  form.setAttribute('action', 'https://formspree.io/f/mojzzakb');
  form.setAttribute('method', 'POST');
  form.removeAttribute('enctype');

  // Remove old mailto leftovers
  form.querySelectorAll('[name="_replyto"]').forEach(el => el.remove());

  // Add hidden Formspree fields
  ['_subject', '_captcha', '_next'].forEach(() => {});
  const subjectField = document.createElement('input');
  subjectField.type = 'hidden';
  subjectField.name = '_subject';
  subjectField.value = 'New Message from Green Point Website';
  form.appendChild(subjectField);

  // Notification elements
  const msgDiv = document.createElement('div');
  msgDiv.id = 'contactMsg';
  msgDiv.style.cssText = 'display:none;padding:12px 16px;border-radius:6px;margin-top:12px;font-weight:bold;font-size:0.95rem;';
  form.parentNode.insertBefore(msgDiv, form.nextSibling);

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Basic client-side validation
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const subject = form.querySelector('#subject')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    if (!name || !email || !subject || !message) {
      showMsg('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch('https://formspree.io/f/mojzzakb', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showMsg('✅ Your message has been sent! We\'ll get back to you shortly.', 'success');
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const errMsg = json.errors ? json.errors.map(e => e.message).join(', ') : 'Something went wrong.';
        showMsg('❌ ' + errMsg + ' Please try again or call us directly.', 'error');
      }
    } catch (err) {
      showMsg('❌ Network error. Please check your connection and try again.', 'error');
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });

  function showMsg(text, type) {
    msgDiv.textContent = text;
    msgDiv.style.display = 'block';
    msgDiv.style.background = type === 'success' ? '#e6f4ea' : '#fde8e8';
    msgDiv.style.color = type === 'success' ? '#1D503A' : '#c0392b';
    msgDiv.style.border = type === 'success' ? '1px solid #a8d5b5' : '1px solid #f5c6cb';
    if (type === 'success') {
      setTimeout(() => { msgDiv.style.display = 'none'; }, 8000);
    }
  }
})();
