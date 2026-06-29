// Booking Form — Google Sheets + Confirmation
(function () {
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxqXPG0dLvwSCWYFJzoJnGPyv4dNIdXlaSc8SpZMrEswL08p2s4u2m-HUG71VSVK04J/exec';

  const form = document.getElementById('bookingForm');
  const msgEl = document.getElementById('formMessage');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name     = document.getElementById('fullname')?.value.trim();
    const tel      = document.getElementById('tel')?.value.trim();
    const email    = document.getElementById('email')?.value.trim();
    const func     = document.getElementById('function')?.value;
    const people   = document.getElementById('people')?.value;
    const date     = document.getElementById('date')?.value;
    const time     = document.getElementById('time')?.value;
    const requests = document.getElementById('requests')?.value.trim() || 'None';

    // Validation
    if (!name || !tel || !email || !func || !people || !date || !time) {
      showMsg('⚠️ Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('⚠️ Please enter a valid email address.', 'error');
      return;
    }
    // Prevent past dates
    if (new Date(date) < new Date(new Date().toDateString())) {
      showMsg('⚠️ Please select a future date.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Submitting…';
    submitBtn.disabled = true;

    const payload = { name, tel, email, function: func, people, date, time, requests, timestamp: new Date().toISOString() };

    try {
      // Send to Google Sheets
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Show success — no-cors means we can't read response, but submission goes through
      showMsg(
        `✅ Booking received! Thank you, ${name}. We'll confirm your ${func} for ${formatDate(date)} at ${formatTime(time)} via email or phone within 24 hours.`,
        'success'
      );
      form.reset();

      // Also open WhatsApp as a secondary channel
      const wa = `https://wa.me/256787150374?text=${encodeURIComponent(
        `*New Booking Request*\nName: ${name}\nTel: ${tel}\nFunction: ${func}\nPeople: ${people}\nDate: ${formatDate(date)}\nTime: ${formatTime(time)}\nRequests: ${requests}`
      )}`;
      setTimeout(() => window.open(wa, '_blank'), 1500);

    } catch (err) {
      showMsg('❌ Could not submit booking. Please call us at +256 787 150374 or send a WhatsApp message.', 'error');
    } finally {
      submitBtn.textContent = 'Submit Booking';
      submitBtn.disabled = false;
    }
  });

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.style.padding = '14px 18px';
    msgEl.style.borderRadius = '6px';
    msgEl.style.marginTop = '16px';
    msgEl.style.fontWeight = 'bold';
    msgEl.style.background = type === 'success' ? '#e6f4ea' : '#fde8e8';
    msgEl.style.color = type === 'success' ? '#1D503A' : '#c0392b';
    msgEl.style.border = type === 'success' ? '1px solid #a8d5b5' : '1px solid #f5c6cb';
    window.scrollTo({ top: msgEl.offsetTop - 20, behavior: 'smooth' });
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-UG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  function formatTime(t) {
    const [h, m] = t.split(':');
    const ampm = +h >= 12 ? 'PM' : 'AM';
    return `${((+h % 12) || 12)}:${m} ${ampm}`;
  }
})();
