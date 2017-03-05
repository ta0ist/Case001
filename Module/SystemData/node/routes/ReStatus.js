var reStatus = require('../controller/reStatus.js');

module.exports = function(app) {

    app.get('/reStatus', reStatus.Index);

    app.post('/SelectLineStatus', reStatus.SelectLineStatus);
}