// Name: Max Schwickert
// Date: Nov 30th 2024
// MEID: MAX2155621
// For the Contact Page: Event, DOM, Links
document.addEventListener('DOMContentLoaded', () => {
    // Form Validation for Contact Page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.style.display = 'none';
            });

            let isValid = true;



            // Message Validation
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                const messageError = document.getElementById('message-error');
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // Create mailto link
                const mailtoLink = `mailto:max@schwickertfamily.com?subject=Contact%20Form%20Submission&body=${encodeURIComponent(message)}`;
                window.location.href = mailtoLink;
            }
        });
    }

});