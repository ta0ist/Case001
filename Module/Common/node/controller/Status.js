var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');

exports.statusif = function(req, res) {
    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/status/index'), { user: req.session.user });
    else
        res.redirect('/')
}


//获取用户
exports.getstatusInfor = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetStatusInfor');
    post_argu.post_argu(res, method);
}

//修改用户
exports.updatestatusInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateStatusInfor');
    post_argu.post_argu(res, method, argus);
}

//删除用户
exports.deletestatusInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeleteStatusInfor');
    post_argu.post_argu(res, method, argus);
}

//新增用户
exports.addstatusInfor = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'AddStatusInfor');
    post_argu.post_argu(res, method, argues);
}