var contentLib = require('/lib/xp/content');
var data = require('/lib/data');
var i18nLib = require('/lib/xp/i18n');
var cacheLib = require('/lib/xp/cache');
var menuCache = cacheLib.newCache({
    size: 10,
    expire: 60 * 60 * 24 * 7
});

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

    var cacheKey = 'menu-' + selectedLocale;
    var menuData = menuCache.get(cacheKey, function () {
        return {
            flatPizzas: getDishes('/ankis-bar/dishes/pizza/flat', selectedLocale),
            inbakadPizzas: getDishes('/ankis-bar/dishes/pizza/inbakad', selectedLocale),
            doublePizzas: getDishes('/ankis-bar/dishes/pizza/double', selectedLocale),
            salads: getDishes('/ankis-bar/dishes/sallad', selectedLocale),
            alCarte: getDishes('/ankis-bar/dishes/al-carte', selectedLocale)
        };
    });

    var model = {
        selectedLocale: selectedLocale,
        flatPizzas: menuData.flatPizzas,
        inbakadPizzas: menuData.inbakadPizzas,
        doublePizzas: menuData.doublePizzas,
        salads: menuData.salads,
        alCarte: menuData.alCarte
    };

    var view = resolve('menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
