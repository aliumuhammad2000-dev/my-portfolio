const menuBar = document.querySelector('.menu-bar');
const hamburger = document.querySelector('.hamburger');
const iconClose = document.querySelector('.icon-close');
const navSidebar = document.querySelector('.nav-sidebar');

menuBar.addEventListener('click', () => {
    navSidebar.classList.toggle('translate-x-full');
    hamburger.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
});

const navLinks = document.querySelectorAll('.nav-sidebar li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navSidebar.classList.toggle('translate-x-full');
        hamburger.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
    });
});