exports.get = function () {

    var thymeleaf = require('/lib/xp/thymeleaf');

    var model = {};

    var view = resolve('footer.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
