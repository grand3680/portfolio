var menu = document.querySelector('.header__navigation_menu');
var nav = document.querySelector('.header__navigation');
var body = document.querySelector("body");

menu.addEventListener('click', function() {
    nav.classList.toggle('inline');
    body.classList.toggle('scroll');
});