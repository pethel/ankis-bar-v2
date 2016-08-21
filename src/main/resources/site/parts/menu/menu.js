exports.get = function (req) {

    var thymeleaf = require('/lib/xp/thymeleaf');
    var contentLib = require('/lib/xp/content');
    var data = require('/lib/data');

    var pizzas = contentLib.getChildren({
        key: '/ankis-bar/dishes/pizza',
        count: 1000000
    }).hits.map(function (hit) {
        var ingredientKeys = hit.data.ingredients || [];
        ingredientKeys = data.forceArray(ingredientKeys);
        var ingredients = ingredientKeys.map(function (key) {
            var hit = contentLib.get({
                key: key,
            });
            return {
                key: hit.data.key
            };
        });
        return {
            key: hit.data.key,
            ingredients: ingredients
        }
    });

    var model = {
        selectedLocale: req.cookies.locale || 'se',
        pizzas: pizzas
    };

    var view = resolve('menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
