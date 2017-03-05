var prospeedctrl = require('../controller/Prospeed.js');

module.exports = function(app) {

    app.get('/prospeed', prospeedctrl.prospeed);


}