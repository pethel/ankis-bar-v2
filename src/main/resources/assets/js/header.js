const mainMenuButton = document.getElementById('js-main-menu');
const mainMenu = document.getElementById('js-menu-drop-down');

mainMenuButton.addEventListener('click', e => {
    e.preventDefault();
    mainMenuButton.classList.toggle('open');
    mainMenu.classList.toggle('open');
});

