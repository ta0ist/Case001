var path = require('path');
var post_argu = require('../../../../routes/post_argu.js');

exports.Index = function(req, res) {
    res.render(path.resolve(__dirname, '../../web/view/reProduction/index'));
}