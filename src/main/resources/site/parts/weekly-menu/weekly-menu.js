var contentLib = require('/lib/xp/content');
var thymeleaf = require('/lib/xp/thymeleaf');
var data = require('/lib/data');
var moment = require('/lib/moment');

function isInCurrentWeek(date) {
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');
    var now = moment(date);
    return now.isBetween(startOfWeek, endOfWeek)
}

exports.get = function (req) {

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
      return isInCurrentWeek(menu.week);
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
