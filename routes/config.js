var path = require('path');
module.exports = {
    //node发布端口
    port: 8080,

    //http post的格式
    options: {
        url: "",
        json: true,
        body: "",
        headers: {
            'content-type': 'application/json',
            'cookie': ''
        }
    },
    webIP: '192.168.1.27',
    webPort: 8222

}