var statusctrl = require('../controller/Status.js');

module.exports = function(app) {

    app.get('/status', statusctrl.statusif);

    app.post('/getstatusInfor', statusctrl.getstatusInfor);

    app.post('/updatestatusInfor', statusctrl.updatestatusInfor);

    app.post('/deletestatusInfor', statusctrl.deletestatusInfor);
 
    app.post('/addstatusInfor', statusctrl.addstatusInfor);

}