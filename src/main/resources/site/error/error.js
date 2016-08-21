var thymeleaf = require('/lib/xp/thymeleaf');

var viewGeneric = resolve('error.html');

exports.handleError = function (err) {

    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }

    var params = {
        errorCode: err.status
    };

    var body = thymeleaf.render(viewGeneric, params);

    return {
        contentType: 'text/html',
        body: body
    }
};
