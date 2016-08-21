exports.get = function (req) {

    var thymeleaf = require('/lib/xp/thymeleaf');

    var model = {
        selectedLocale: req.cookies.locale || 'se',
    };

    var view = resolve('map.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
