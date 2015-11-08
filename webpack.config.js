var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcDir = path.join(__dirname, 'src');

module.exports = {
  entry: {
    vendor: ['react', 'immutable'],
    devtools: srcDir + '/devtools.js',
    panel: srcDir + '/panel.js',
    background: srcDir + '/background.js'
  },
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: process.env.NODE_ENV === 'prod'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      chunks: ['devtools']
    }),
    new HtmlWebpackPlugin({
      filename: 'panel.html',
      chunks: ['vendor', 'panel'],
      hash: true
    })
  ]
};