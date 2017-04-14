exports.get = function (req) {

    var portal = require('/lib/xp/portal');
    var thymeleaf = require('/lib/xp/thymeleaf');
    var menu = require('/lib/menu');

    var menuItems = menu.getSiteMenu();
    var component = portal.getComponent();

    var homeUrl = portal.pageUrl({id: portal.getSite()._id});
    /* var weeklyMenu = contentLib.getChildren({
        key: '/ankis-bar/dagens/',
        count: 1000000
    }).hits.map(function (hit) {
        return {
            week: new Date(hit.data.week),
            monday: hit.data.monday,
            tuesday: hit.data.tuesday,
            wednesday: hit.data.wednesday,
            thursday: hit.data.thursday,
            friday: hit.data.friday
        };
    }).filter(function(menu) {
        return isInCurrentWeek(menu.week);
    });*/


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
