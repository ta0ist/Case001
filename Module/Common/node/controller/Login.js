var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');





exports.loginpage = function(req, res) {
    res.render(path.resolve(__dirname, '../../web/view/login/index'));
}

exports.main = function(req, res) {
    if (!req.session.user)
        res.redirect('/login');
    else
        res.render(path.resolve(__dirname, '../../web/view/proplan/index'), { user: req.session.user });
}

exports.checkuser = function(req, res) {
    var name = req.body.user.Name;
    var md5 = crypto.createHash('md5'),
        pwd = 1;
    var pwd = md5.update(req.body.user.Password).digest('hex');

    var method = post_argu.getpath(__filename, 'UserLogin');
    request.post({

        url: method,
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: { userName: req.body.user.Name, password: pwd },
    }, function(error, response, body) {
        if (error) {
            throw error;
        } else {
            if (!body.d) {
                res.json({
                    Status: result.StatusCode,
                    Message: result.Message
                });
            } else {
                req.session.user = name
                var result = JSON.parse(body.d);

                res.json({
                    Data: result.Data,
                    Status: result.StatusCode,
                    Message: errorcode["Return_Code" + result.StatusCode]
                });
            }
        }
    })


}

exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/login');
}