var Common = {};
Common.login = require('./routes/Login.js');
Common.user = require('./routes/User.js');
Common.productif = require('./routes/Product.js');
Common.person = require('./routes/Person.js');
Common.line = require('./routes/Line.js');
Common.status = require('./routes/Status.js');
Common.proplan = require('./routes/Proplan.js');
Common.board = require('./routes/Board.js');

module.exports = function(app) {
    Common.login(app);
    Common.user(app);
    Common.productif(app);
    Common.person(app);
    Common.line(app);
    Common.status(app);
    Common.proplan(app);
    Common.board(app);
}