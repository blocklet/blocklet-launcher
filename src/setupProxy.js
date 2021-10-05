const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://127.0.0.1:3030';

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({ target }));
};
