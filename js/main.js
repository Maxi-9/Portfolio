// Name: Max Schwickert
// Date: Nov 30th 2024
// MEID: MAX2155621
// js/main.js

// For all pages: Event, DOM
document.addEventListener('DOMContentLoaded', () => {
    // Toggle Navigation Menu for Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});
