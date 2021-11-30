/* eslint-disable */
const path = require('path');

module.exports = {
  publicPath: "./",
  outputDir: path.join(__dirname, "../backend/views"),
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
    } else {
      config.mode = "development";
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'PLUSKIT';
      return args;
    });
  },
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  lintOnSave: false,
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8051,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": {
          target:`http://[::1]:3000`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "api/",
        }
      },
    }

  },
};
