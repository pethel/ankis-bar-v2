var thymeleaf = require('/lib/xp/thymeleaf');
var portal = require('/lib/xp/portal');

exports.get = function(req) {

    // Resolve the view
    var view = resolve('default.html');
    var portal = require('/lib/xp/portal');
    // Define the model
    var content = portal.getContent();



    var mainRegion = content.page.regions["main"];


    var model = {
        name: "Michael",
        mainRegion: mainRegion
    };

    // Render a thymeleaf template
    var body = thymeleaf.render(view, model);

    // Return the result
    return {
        body: body,
        contentType: 'text/html'
    };

};
