const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/best',
    createProxyMiddleware({
      target: 'https://www.reddit.com',
      changeOrigin: true,
      pathRewrite: {
        '^/best/communities': '/best/communities/1',
      },
    })
  );
};
