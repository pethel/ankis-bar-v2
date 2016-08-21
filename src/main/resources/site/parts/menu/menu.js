var contentLib = require('/lib/xp/content');
var data = require('/lib/data');
var i18nLib = require('/lib/xp/i18n');

function getDishes(path, locale) {
    return contentLib.getChildren({
        key: path,
        count: 1000000
    }).hits.map(function (hit) {

        var ingredientKeys = hit.data.ingredients || [];
        ingredientKeys = data.forceArray(ingredientKeys);

        var ingredients = ingredientKeys.map(function (key) {
            var hit = contentLib.get({key: key});
            return i18nLib.localize({
                key: hit.data.key,
                locale: locale
            });
        }).join(', ');

        return {
            key: hit.data.key,
            price: hit.data.price,
            ingredients: ingredients
        }
    });
}


exports.get = function (req) {

    var selectedLocale = req.cookies.locale || 'se';
    var thymeleaf = require('/lib/xp/thymeleaf');
    var flatPizzas = getDishes('/ankis-bar/dishes/pizza/flat', selectedLocale);
    var inbakadPizzas = getDishes('/ankis-bar/dishes/pizza/inbakad', selectedLocale);
    var doublePizzas = getDishes('/ankis-bar/dishes/pizza/double', selectedLocale);
    var salads = getDishes('/ankis-bar/dishes/sallad', selectedLocale);
    var alCarte = getDishes('/ankis-bar/dishes/al-carte', selectedLocale);

    var model = {
        selectedLocale: selectedLocale,
        flatPizzas: flatPizzas,
        inbakadPizzas: inbakadPizzas,
        doublePizzas: doublePizzas,
        salads: salads,
        alCarte: alCarte
    };

    var view = resolve('menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
