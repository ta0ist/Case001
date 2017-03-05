var linectrl = require('../controller/LineInfor.js');


module.exports = function(app) {

    app.get('/line', linectrl.line);

    app.post('/getline', linectrl.getline);

    app.post('/updateLineInfor', linectrl.UpdateLineInfor);

    app.post('/DeleteLineInfor', linectrl.DeleteLineInfor);

    app.post('/addLineInfor', linectrl.addLineInfor);

    app.post('/getfreeperson', linectrl.getfreeperson);

    app.post('/AddMgePerson', linectrl.AddMgePerson);

    app.post('/AddOptPerson', linectrl.AddOptPerson);


}