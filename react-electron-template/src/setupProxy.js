const {createProxy, createProxyMiddleware} = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/objects', {
            target: 'http://101.43.156.185:8080/',
            secure: false,
            changeOrigin: true,
        })
    )
}