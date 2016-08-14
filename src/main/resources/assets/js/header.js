const mainMenu = document.querySelector('.js-main-menu');
mainMenu.addEventListener('click', e => {
    e.preventDefault();
    mainMenu.classList.toggle('open');
    document.querySelector('main-header');
});
