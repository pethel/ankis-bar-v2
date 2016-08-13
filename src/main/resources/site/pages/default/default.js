var thymeleaf = require('/lib/xp/thymeleaf');

exports.post  = function(req) {
    var portal = require('/lib/xp/portal');
    log.info('params === %s', req.params);

    return {
        redirect: portal.pageUrl({id: portal.getSite()._id}),
        cookies: {
            'locale': req.params.locale
        }
    }

};

exports.get = function(req) {

    // Resolve the view
    var view = resolve('default.html');
    var portal = require('/lib/xp/portal');
    // Define the model
    var content = portal.getContent();

    var mainRegion = content.page.regions["main"];

    var model = {mainRegion: mainRegion};

    // Render a thymeleaf template
    var body = thymeleaf.render(view, model);

    // Return the result
    return {
        body: body,
        contentType: 'text/html'
    };

};
