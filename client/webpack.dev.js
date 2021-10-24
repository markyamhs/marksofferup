const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge').merge;

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    port: 3010,
    historyApiFallback: true,
    hot: true,
    watchFiles: ['src/**'],
    liveReload: true,
  },
});
