var path = require('path');
var post_argu = require('../../../../routes/post_argu.js');


exports.Index = function(req, res) {

    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/reSpeed/index'), { user: req.session.user });
    else {
        res.redirect('/');
    }
}

exports.SelectProductionSpeed = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'SelectProductionSpeed');
    post_argu.post_argu(res, method, argues);
}

exports.SelectProductionOrderSpeed = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'SelectProductionOrderSpeed');
    post_argu.post_argu(res, method, argues);
}