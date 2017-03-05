var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');

exports.line = function(req, res) {
    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/line/index'), { user: req.session.user });
    else
        res.redirect('/')
}

//获取用户
exports.getline = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetLineInfor');
    post_argu.post_argu(res, method);
}

//获取人员信息
exports.getfreeperson = function(req, res) {
        var method = post_argu.getpath(__filename, 'GetFreePerson');
        post_argu.post_argu(res, method);
    }
    //修改用户
exports.UpdateLineInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateLineInfor');
    //var method = 'http://192.168.1.27:8222/WebService.asmx/UpdateUserInfor';
    post_argu.post_argu(res, method, argus);
}

//删除用户
exports.DeleteLineInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeleteLineInfor');
    //var method = 'http://192.168.1.27:8222/WebService.asmx/DeleteUserInfor';
    post_argu.post_argu(res, method, argus);
}

//新增用户
exports.addLineInfor = function(req, res) {
        var argues = req.body;
        var method = post_argu.getpath(__filename, 'AddLineInfor');
        //var method = 'http://192.168.1.27:8222/WebService.asmx/AddUserInfor';
        post_argu.post_argu(res, method, argues);
    }
    //更新产线
exports.updatemge = function(req, res) {
        var argues = req.body;
        var method = post_argu.getpath(__filename, 'UpdateMge');
        post_argu.post_argu(res, method, argues);
    }
    //添加负责人
exports.AddMgePerson = function(req, res) {
        var argues = req.body;
        var method = post_argu.getpath(__filename, 'AddMgePerson');
        post_argu.post_argu(res, method, argues);
    }
    //添加操作人
exports.AddOptPerson = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'AddOptPerson');
    post_argu.post_argu(res, method, argues);
}