var productctrl = require('../controller/Product.js');

module.exports = function(app) {

    app.get('/product', productctrl.productif);

    app.post('/getproduct', productctrl.getproduct);

    app.post('/updateproduct', productctrl.updateproduct);

    app.post('/deleteProductInfor', productctrl.deleteProductInfor);

    app.post('/addProductInfor', productctrl.addProductInfor);

}