var contentLib = require('/lib/xp/content');
var data = require('/lib/data');

function getDishes(path) {
    return contentLib.getChildren({
        key: path,
        count: 1000000
    }).hits.map(function (hit) {

        var ingredientKeys = hit.data.ingredients || [];
        ingredientKeys = data.forceArray(ingredientKeys);

        var ingredients = ingredientKeys.map(function (key) {
            var hit = contentLib.get({key: key});
            return {
                key: hit ? hit.data.key : ''
            };
        });

        return {
            key: hit.data.key,
            price: hit.data.price,
            ingredients: ingredients
        }
    });
}


exports.get = function (req) {

    var thymeleaf = require('/lib/xp/thymeleaf');
    var flatPizzas = getDishes('/ankis-bar/dishes/pizza/flat');
    var inbakadPizzas = getDishes('/ankis-bar/dishes/pizza/inbakad');
    var doublePizzas = getDishes('/ankis-bar/dishes/pizza/double');
    var salads = getDishes('/ankis-bar/dishes/sallad');
    var alCarte = getDishes('/ankis-bar/dishes/al-carte');

    log.info('%s', alCarte);

    var model = {
        selectedLocale: req.cookies.locale || 'se',
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
