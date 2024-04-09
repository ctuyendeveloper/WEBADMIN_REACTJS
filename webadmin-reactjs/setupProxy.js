const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ctuyendatn.great-site.net',
      changeOrigin: true,
    })
  );
};