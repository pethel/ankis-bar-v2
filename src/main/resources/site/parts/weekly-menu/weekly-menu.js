var contentLib = require('/lib/xp/content');
var thymeleaf = require('/lib/xp/thymeleaf');
var data = require('/lib/data');
var dateUtil = require('/lib/date-util');
var moment = require('moment');

exports.get = function () {

    var weeklyMenu = contentLib.getChildren({
        key: '/ankis-bar/dagens/',
        count: 1
    }).hits.map(function (hit) {
        return {
            week: new Date(hit.data.week),
            price:hit.data.price.toFixed(2),
            monday: hit.data.monday,
            tuesday: hit.data.tuesday,
            wednesday: hit.data.wednesday,
            thursday: hit.data.thursday,
            friday: hit.data.friday
        };
    }).filter(function(menu) {
      return dateUtil.isInCurrentWeek(menu.week);
    });

    var model = {
        menu: weeklyMenu[0],
        week: moment().startOf('isoWeek').week().toFixed()
    };

    var view = resolve('weekly-menu.html');

    return {
        body: thymeleaf.render(view, model),
        contentType: 'text/html'
    };
};
