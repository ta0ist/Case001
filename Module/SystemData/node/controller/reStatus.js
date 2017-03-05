var path = require('path');
var post_argu = require('../../../../routes/post_argu.js');


exports.Index = function(req, res) {

    if (req.session.user)
        res.render(path.resolve(__dirname, '../../web/view/reStatus/index'), { user: req.session.user });
    else {
        res.redirect('/');
    }
}

exports.SelectLineStatus = function(req, res) {
    var argues = req.body;
    var method = post_argu.getpath(__filename, 'SelectLineStatus');
    post_argu.post_argu(res, method, argues);
}