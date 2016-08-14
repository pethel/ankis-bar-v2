const mainMenu = document.querySelector('.js-main-menu');
if (mainMenu) {
    mainMenu.addEventListener('click', e => {
        e.preventDefault();
        mainMenu.classList.toggle('open');
    });
}
