var userctrl = require('../controller/User.js');

module.exports = function(app) {

    app.get('/user', userctrl.user);

    app.post('/getuser', userctrl.getuser);

    app.post('/updateuser', userctrl.updateuser);

    app.post('/deleteUserInfor', userctrl.deleteUserInfor);

    app.post('/addUserInfor', userctrl.addUserInfor);

    app.post('/lockuser', userctrl.lockuser);

    app.post('/updatepassward', userctrl.updatepassward);

}