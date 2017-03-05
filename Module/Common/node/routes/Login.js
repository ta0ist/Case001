var loginctrl = require('../controller/Login.js');

module.exports = function(app) {
    //主页面
    app.get('/', loginctrl.main);
    //登陆页面
    app.get('/login', loginctrl.loginpage);

    app.post('/checkuser', loginctrl.checkuser);

    app.get('/logout', loginctrl.logout);
}