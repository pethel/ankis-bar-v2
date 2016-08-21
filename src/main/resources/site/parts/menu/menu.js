var contentLib = require('/lib/xp/content');
var data = require('/lib/data');

function getDish(path) {
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
    var flatPizzas = getDish('/ankis-bar/dishes/pizza/flat');
    var inbakadPizzas = getDish('/ankis-bar/dishes/pizza/inbakad');
    var doublePizzas = getDish('/ankis-bar/dishes/pizza/double');

    var model = {
        selectedLocale: req.cookies.locale || 'se',
        flatPizzas: flatPizzas,
        inbakadPizzas: inbakadPizzas,
        doublePizzas: doublePizzas
    };

    var view = resolve('menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
