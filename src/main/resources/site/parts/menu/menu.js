exports.get = function (req) {

    var portal = require('/lib/xp/portal');
    var thymeleaf = require('/lib/xp/thymeleaf');

    var model = {};

    var view = resolve('menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
