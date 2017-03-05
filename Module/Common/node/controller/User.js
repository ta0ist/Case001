var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');




exports.user = function(req, res) {

    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/user/index'), { user: req.session.user });
    else {
        res.redirect('/');
    }
}

//获取用户
exports.getuser = function(req, res) {
    var userName = {
        userName: req.session.user
    }
    var method = post_argu.getpath(__filename, 'GetUserInfor');
    post_argu.post_argu(res, method, userName);
}

//修改用户
exports.updateuser = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateUserInfor');
    post_argu.post_argu(res, method, argus);
}

//删除用户
exports.deleteUserInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeleteUserInfor');
    post_argu.post_argu(res, method, argus);
}

//新增用户
exports.addUserInfor = function(req, res) {
    var md5 = crypto.createHash('md5'),
        pwd = 1;
    var pwd = md5.update(req.body.model.User_Password).digest('hex');

    var argus = req.body;
    argus.model.User_Password = pwd;
    var method = post_argu.getpath(__filename, 'AddUserInfor');

    post_argu.post_argu(res, method, argus);
}

//锁定用户
exports.lockuser = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateUserInfor');
    post_argu.post_argu(res, method, argus);
}


//重置密码
exports.updatepassward = function(req, res) {

    var md5 = crypto.createHash('md5'),
        pwd = 1;
    var pwd = md5.update(req.body.model.User_Password).digest('hex');

    var argus = req.body;
    argus.model.User_Password = pwd;
    var method = post_argu.getpath(__filename, 'UpdateUserInfor');
    post_argu.post_argu(res, method, argus);
}