

exports.post  = function(req) {
    var portal = require('/lib/xp/portal');

    return {
        redirect: portal.pageUrl({id: portal.getSite()._id}),
        cookies: {
            'locale': req.params.locale
        }
    }

};

exports.get = function() {

    var thymeleaf = require('/lib/xp/thymeleaf');
    var view = resolve('default.html');
    var portal = require('/lib/xp/portal');

    var content = portal.getContent();
    var mainRegion = content.page.regions["main"];

    var model = {mainRegion: mainRegion};

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
