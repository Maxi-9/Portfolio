// Name: Max Schwickert
// Date: Nov 30th 2024
// MEID: MAX2155621
// For the Resume Page: Event, DOM, Listener
document.addEventListener('DOMContentLoaded', () => {
    // Expandable Resume Sections
    const resumeHeadings = document.querySelectorAll('.resume-item h2');
    resumeHeadings.forEach(heading => {
        heading.addEventListener('click', () => {
            const contentId = heading.getAttribute('onclick').match(/'(.+)'/)[1];
            const content = document.getElementById(contentId);

            content.classList.toggle('show');
            heading.classList.toggle('active');
        });
    });
});