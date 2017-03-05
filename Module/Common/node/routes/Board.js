var boardctrl = require('../controller/PadProductionInfor.js');

module.exports = function(app) {

    app.get('/board', boardctrl.board);

    app.post('/getunfinishproduct', boardctrl.getunfinishproduct);

    app.get('/GetPersonInfor', boardctrl.GetPersonInfor);

    app.get('/getIP', boardctrl.getIP);

    app.post('/GetPadModelByIP', boardctrl.GetPadModelByIP);

    app.post('/ClickBegin', boardctrl.ClickBegin);

    app.post('/ClickCancel', boardctrl.ClickCancel);

    app.post('/ClickComplete', boardctrl.ClickComplete);

    app.post('/ClickStop', boardctrl.ClickStop);

    app.post('/ChangeMsgPerson', boardctrl.ChangeMsgPerson);

    app.post('/ChangeOptPerson', boardctrl.ChangeOptPerson);

    app.post('/GetRealTimeSpeed', boardctrl.GetRealTimeSpeed);

    app.post('/GetRealYieldNum', boardctrl.GetRealYieldNum);

    app.post('/DeviceRunStatus', boardctrl.DeviceRunStatus);
}