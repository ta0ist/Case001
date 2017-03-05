var request = require('request');
var config = require(__dirname + '/config.js');
var errorcode = require(__dirname + '/error.js');
var path = require('path');


//提交参数
exports.post_argu = function(res, method, args) {
    request.post({
        url: method,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: args,
    }, function(error, response, body) {
        if (error) {
            res.json({
                Data: null,
                Status: -9999,
                Message: error
            });
        } else {
            if (!body.d) {
                res.json({
                    Data: null,
                    Status: -9999,
                    Message: body.Message
                });
            } else {
                var result = JSON.parse(body.d);
                res.json({
                    Data: result.Data,
                    Status: result.StatusCode,
                    Message: result.Data
                });
            }

        }
    })
}

//获取路径
exports.getpath = function(_path, method) {
    var pt = _path.split('\\');
    return global.Webservice + '/' + pt[pt.length - 4] + '/' + pt[pt.length - 1].split('.')[0] + '.asmx/' + method;
}