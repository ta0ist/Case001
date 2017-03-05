var personctrl = require('../controller/PersonInfor.js');

module.exports = function(app) {

    app.get('/person', personctrl.person);

    app.post('/getpersonInfor', personctrl.getpersonInfor);

    app.post('/updatepersonInfor', personctrl.updatepersonInfor);

    app.post('/deletepersonInfor', personctrl.deletepersonInfor);

    app.post('/addpersonInfor', personctrl.addpersonInfor);

    app.post('/lockperson', personctrl.lockperson);

}