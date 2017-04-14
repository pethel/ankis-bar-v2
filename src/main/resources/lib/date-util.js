var moment = require('moment');

exports.isInCurrentWeek = function(date) {
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');
    var now = moment(date);
    return now.isBetween(startOfWeek, endOfWeek)
};
