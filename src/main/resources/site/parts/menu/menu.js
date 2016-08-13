var menu = require('/lib/menu');


// Handle GET requests
exports.get = function(req) {

    var portal = require('/lib/xp/portal'); // Import the portal functions
    var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function


    var menuItems = menu.getSiteMenu();
    //log.info('%s', req);


    // Find the current component from request
    var component = portal.getComponent();

    // Find a config variable for the component
    var things = component.config["thing"] || [];

    // Define the model
    var model = {
        component: component,
        menuItems: menuItems,
        things: things,
    };

    // Resolve the view
    var view = resolve('menu.html');

    // Render a thymeleaf template
    var body = thymeleaf.render(view, model);


    // Return the result
    return {
        body: body,
        contentType: 'text/html'
    };

};