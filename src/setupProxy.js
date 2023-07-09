// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(`${url}`, {
      target: url,
      changeOrigin: true,
    })
  );
};
