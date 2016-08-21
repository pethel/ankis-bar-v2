import Cookies from 'js-cookie';

const countrySelect = document.querySelector('.country-select');
const select = countrySelect.querySelector('div');

select.addEventListener('click', e => {
    e.preventDefault();
    countrySelect.classList.toggle('open');

});

Array.from(countrySelect.querySelectorAll('li')).forEach(li => {

    li.addEventListener('click', e => {
        e.preventDefault();
        const locale = li.getAttribute('data-locale');
        Cookies.set('locale', locale, {expires: 365});
        window.location.reload();
    });

});
