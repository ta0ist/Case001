var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');
var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var fs = require('fs');

exports.proplan = function(req, res) {
    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/proplan/index'), { user: req.session.user });
    else
        res.redirect('/')
}

exports.getproplan_un = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetProductionStatusN');
    post_argu.post_argu(res, method);
}

exports.getproplan_ing = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetProductionStatusI');
    post_argu.post_argu(res, method);
}

exports.getproplan_stop = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetProductionStatusS');
    post_argu.post_argu(res, method);
}

exports.getproplan_finish = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetProductionStatusF');
    post_argu.post_argu(res, method);
}

exports.addproplan = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'AddProductionPlanInfor');
    post_argu.post_argu(res, method, argus);
}

exports.deleteproplan = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeleteProductionPlanInfor');
    post_argu.post_argu(res, method, argus);
}

exports.updateproplan = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateProductionPlanInfor');
    post_argu.post_argu(res, method, req.body);
}

exports.lockplan = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateEnable');
    post_argu.post_argu(res, method, argus);
}

exports.importExcel = function(req, res) {
    //var filename = req.body.path;
    var filename = './public/excel/排产计划导入格式.xls';
    var obj = xlsx.parse(filename);
    var argu = {
        data: JSON.stringify(obj[0].data)
    };
    var method = post_argu.getpath(__filename, 'AddExcelData');
    post_argu.post_argu(res, method, argu);

}