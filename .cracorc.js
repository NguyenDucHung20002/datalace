const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Thêm plugin JavaScriptObfuscator vào trong plugins
      webpackConfig.plugins.push(
        new JavaScriptObfuscator({
          rotateUnicodeArray: true,
        })
      );
      return webpackConfig;
    },
  },
};

