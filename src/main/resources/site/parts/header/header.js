exports.get = function (req) {

    var portal = require('/lib/xp/portal');
    var thymeleaf = require('/lib/xp/thymeleaf');
    var menu = require('/lib/menu');

    var menuItems = menu.getSiteMenu();
    var component = portal.getComponent();

    var homeUrl = portal.pageUrl({id: portal.getSite()._id});

    var model = {
        component: component,
        menuItems: menuItems,
        selectedLocale: req.cookies.locale || 'se',
        homeUrl: homeUrl
    };

    var view = resolve('header.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
