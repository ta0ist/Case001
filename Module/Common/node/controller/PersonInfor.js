var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');

exports.person = function(req, res) {
    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/person/index'), { user: req.session.user });
    else
        res.redirect('/')
}

//获取用户
exports.getpersonInfor = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetPersonInfor');
    post_argu.post_argu(res, method);
}

//修改用户
exports.updatepersonInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdatePersonInfor');
    post_argu.post_argu(res, method, argus);
}

//删除用户
exports.deletepersonInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeletePersonInfor');
    post_argu.post_argu(res, method, argus);
}

//新增用户
exports.addpersonInfor = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'AddPersonInfor');
    post_argu.post_argu(res, method, argues);
}

exports.lockperson = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'UpdatePersonInfor');
    post_argu.post_argu(res, method, argues);
}