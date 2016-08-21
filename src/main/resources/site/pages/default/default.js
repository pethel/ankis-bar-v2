
exports.get = function (req) {

    var thymeleaf = require('/lib/xp/thymeleaf');
    var view = resolve('default.html');
    var portal = require('/lib/xp/portal');

    var content = portal.getContent();
    var mainRegion = content.page.regions['main'];

    var model = {
        mainRegion: mainRegion,
        selectedLocale: req.cookies.locale || 'se'
    };

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
