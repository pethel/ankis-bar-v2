const countrySelect = document.querySelector('.country-select');
const select = countrySelect.querySelector('div');
const input = countrySelect.querySelector('input[name="locale"]');

select.addEventListener('click', e => {
    e.preventDefault();
    countrySelect.classList.toggle('open');

});

Array.from(countrySelect.querySelectorAll('li')).forEach(li => {

    li.addEventListener('click', e => {
        e.preventDefault();
        const locale = li.getAttribute('data-locale');
        input.value = locale;
        countrySelect.submit();
    });

});
