var reSpeedctrl = require('../controller/reSpeed.js');

module.exports = function(app) {

    app.get('/reSpeed', reSpeedctrl.Index);

    app.post('/SelectProductionSpeed', reSpeedctrl.SelectProductionSpeed);

    app.post('/SelectProductionOrderSpeed', reSpeedctrl.SelectProductionOrderSpeed);
}