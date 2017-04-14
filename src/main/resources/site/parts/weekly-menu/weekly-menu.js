var contentLib = require('/lib/xp/content');
var thymeleaf = require('/lib/xp/thymeleaf');
var data = require('/lib/data');
var dateUtil = require('/lib/date-util');

exports.get = function () {

    var weeklyMenu = contentLib.getChildren({
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
      return dateUtil.isInCurrentWeek(menu.week);
    });

    log.info("moment().startOf('isoWeek') %s",  moment().startOf('isoWeek').week());

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
