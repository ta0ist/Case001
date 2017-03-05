var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');

exports.board = function(req, res) {
        res.render(path.resolve(__dirname, '../../web/view/board/index'));
    }
    //获取ip
exports.getIP = function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';
    if (ip.split(':').length > 0) {
        ip = ip.split(':')[ip.split(':').length - 1]
    }
    res.json({
        ip: ip
    })
}

exports.GetPadModelByIP = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'GetPadModelByIP');
    post_argu.post_argu(res, method, argus);
}

//获取工单
exports.getunfinishproduct = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'GetUnFinishProduct');
        post_argu.post_argu(res, method, argus);
    }
    //获取人员
exports.GetPersonInfor = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetPersonInfor');
    post_argu.post_argu(res, method);
}

//订单开始
exports.ClickBegin = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ClickBegin');
        post_argu.post_argu(res, method, argus);
    }
    //订单取消
exports.ClickCancel = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ClickCancel');
        post_argu.post_argu(res, method, argus);
    }
    //订单完成
exports.ClickComplete = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ClickComplete');
        post_argu.post_argu(res, method, argus);
    }
    //订单停止
exports.ClickStop = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ClickStop');
        post_argu.post_argu(res, method, argus);
    }
    //设置产线负责人
exports.ChangeMsgPerson = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ChangeMsgPerson');
        post_argu.post_argu(res, method, argus);
    }
    //设置产线操作人
exports.ChangeOptPerson = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'ChangeOptPerson');
        post_argu.post_argu(res, method, argus);
    }
    //加载当前速度
exports.GetRealTimeSpeed = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'GetRealTimeSpeed');
        post_argu.post_argu(res, method, argus);
    }
    //加载当前产量
exports.GetRealYieldNum = function(req, res) {
        var argus = req.body;
        var method = post_argu.getpath(__filename, 'GetRealYieldNum');
        post_argu.post_argu(res, method, argus);
    }
    //控制三色灯
exports.DeviceRunStatus = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeviceRunStatus');
    post_argu.post_argu(res, method, argus);
}