var SystemData = {};
SystemData.respeed = require('./routes/ReSpeed.js');
SystemData.reProduction = require('./routes/ReProduction.js');
SystemData.reStatus = require('./routes/ReStatus.js');
module.exports = function(app) {
    SystemData.respeed(app);
    SystemData.reProduction(app);
    SystemData.reStatus(app);
}