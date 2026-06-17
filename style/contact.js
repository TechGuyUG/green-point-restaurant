const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const replyto = document.getElementById('replyto');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!name || !email || !subject || !message) {
            contactFormMessage.textContent = 'Please fill in all required fields before sending.';
            contactFormMessage.style.color = 'red';
            return;
        }

        if (replyto) replyto.value = email;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                    _replyto: email,
                    _subject: 'New message from Green Point contact page'
                })
            });

            if (response.ok) {
                contactFormMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactFormMessage.style.color = 'green';
                contactForm.reset();
            } else {
                contactFormMessage.textContent = 'Unable to send your message right now. Please try again later.';
                contactFormMessage.style.color = 'red';
            }
        } catch (error) {
            contactFormMessage.textContent = 'Network error. Please check your connection and try again.';
            contactFormMessage.style.color = 'red';
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}
