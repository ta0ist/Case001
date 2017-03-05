var path = require('path');
var config = require('../../../../routes/config.js');
var errorcode = require('../../../../routes/error.js');
var request = require('request');
var _ = require('underscore');
var session = require('express-session');
var crypto = require('crypto');
var post_argu = require('../../../../routes/post_argu.js');

exports.productif = function(req, res) {
    res.render(path.resolve(__dirname, '../../web/view/product/index'));
}

//获取用户
exports.getproduct = function(req, res) {
    var method = post_argu.getpath(__filename, 'GetProductInfor');
    post_argu.post_argu(res, method);
}

//修改用户
exports.updateproduct = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'UpdateProductInfor');
    post_argu.post_argu(res, method, argus);
}

//删除用户
exports.deleteProductInfor = function(req, res) {
    var argus = req.body;
    var method = post_argu.getpath(__filename, 'DeleteProductInfor');
    post_argu.post_argu(res, method, argus);
}

//新增用户
exports.addProductInfor = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'AddProductInfor');
    post_argu.post_argu(res, method, argues);
}