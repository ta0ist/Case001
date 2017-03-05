var proplanctrl = require('../controller/ProductionPlanInfor.js');

module.exports = function(app) {

    app.get('/proplan', proplanctrl.proplan);

    app.post('/getproplan_un', proplanctrl.getproplan_un);

    app.post('/getproplan_ing', proplanctrl.getproplan_ing);

    app.post('/getproplan_stop', proplanctrl.getproplan_stop);

    app.post('/getproplan_finish', proplanctrl.getproplan_finish);

    app.post('/addproplan', proplanctrl.addproplan);

    app.post('/deleteproplan', proplanctrl.deleteproplan);

    app.post('/updateproplan', proplanctrl.updateproplan);

    app.post('/lockplan', proplanctrl.lockplan);

    app.post('/importExcel', proplanctrl.importExcel);


}