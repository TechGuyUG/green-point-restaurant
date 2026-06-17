const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

function setContactStatus(message, type) {
    if (!contactFormMessage) return;
    contactFormMessage.textContent = message;
    contactFormMessage.dataset.state = type;
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            setContactStatus('Please complete the highlighted fields before sending.', 'error');
            return;
        }

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const replyto = document.getElementById('replyto');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        if (!name || !email || !subject || !message) {
            setContactStatus('Please fill in all required fields before sending.', 'error');
            return;
        }

        if (replyto) replyto.value = email;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            const formData = new FormData(contactForm);
            formData.set('_replyto', email);
            formData.set('_subject', 'New message from Green Point contact page');

            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setContactStatus('Thank you. Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                setContactStatus('Unable to send your message right now. Please try again later.', 'error');
            }
        } catch (error) {
            setContactStatus('Network error. Please check your connection and try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}
