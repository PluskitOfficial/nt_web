const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const proxyOpt = require('./common/proxy.js');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history({
    rewrites: [
        {
            from: /^\/api\/.*$/,
            to: function(context) {
                return context.parsedUrl.path
            }
        }
    ]
}));
app.use(express.static(path.join(__dirname, 'views')));
app.locals = { 'static_url': '', 'year': new Date().getFullYear() }
app.use('/api/proxy', proxy.createProxyMiddleware(proxyOpt()));


app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
