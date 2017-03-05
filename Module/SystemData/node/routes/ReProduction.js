var reProduction = require('../controller/reProduction.js');

module.exports = function(app) {

    app.get('/reProduction', reProduction.Index);


}