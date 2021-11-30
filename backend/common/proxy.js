const querystring = require('querystring');
//
const SERVER_API = process.env.SERVER_API;

function proxyOpt() {
    return{
        target: SERVER_API,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
        '^/api/proxy': '',
        },
        onProxyReq: function(proxyReq, req, res) {
            delete req.headers.host
            let headers = req.headers
            for(let key in headers) {
              proxyReq.setHeader(key, headers[key])
            }

            if (req.body) {
              let bodyData = querystring.stringify(req.body);
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }

            console.log('======>>>>>>')
            console.log({
              'req.body': req.body,
              'req.url': SERVER_API + req.url,
              'req.headers': headers,
            })
            console.log('<<<<<<======')
        },
        onProxyRes(proxyRes, req, res) {
            delete proxyRes.headers['access-control-allow-origin'];
        },
        onError(err, req, res) {
            console.log(req.url, 'err rul')
            res.send(formatReturn(99904, {}, 'proxy error'));
        }
    }
}

const ERR_CODE = {
    0: 'ok',
    99904: 'system error',
}

const formatReturn = function(code, data = {}, msg = "") {
    const message = msg ? msg : (ERR_CODE[code] || "");
    return { code, data, message };
};

module.exports = proxyOpt
