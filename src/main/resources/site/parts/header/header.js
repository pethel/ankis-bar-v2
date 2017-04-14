var dateUtil = require('/lib/date-util');
var contentLib = require('/lib/xp/content');
exports.get = function (req) {

    var portal = require('/lib/xp/portal');
    var thymeleaf = require('/lib/xp/thymeleaf');
    var menu = require('/lib/menu');
    var selectedLocale = req.cookies.locale || 'se';

    var component = portal.getComponent();

    var homeUrl = portal.pageUrl({ id: portal.getSite()._id });
    var showWeeklyMenu = !!contentLib.getChildren({
        key: '/ankis-bar/dagens/',
        count: 1
    }).hits.filter(function (hit) {
        return dateUtil.isInCurrentWeek(new Date(hit.data.week));
    }).length;

    var menuItems = menu.getSiteMenu()
        .filter(function (menu) {
            return !(!showWeeklyMenu && menu.name === 'veckomeny');
        })
        .filter(function (menu) {
            return !(menu.name === 'veckomeny' && selectedLocale !== 'se');
        });

    var model = {
        component: component,
        menuItems: menuItems,
        selectedLocale: selectedLocale,
        homeUrl: homeUrl
    };

    var view = resolve('header.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };

};
