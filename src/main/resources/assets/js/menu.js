Array.from(document.querySelectorAll('.js-accordion-header')).forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        link.classList.toggle('open');
    });
});
