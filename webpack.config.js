/**
 * @overview
 *  Webpack configuration for Dockyard
 *
 * @since 0.1.0
 */
'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'prod';

const srcDir = path.join(__dirname, 'src');
const destDir = path.resolve(__dirname, (IS_PRODUCTION ? 'dist' : 'compiled'));

// Define entry points
let entry = {
  devtools: srcDir + '/chrome/devtools.js',
  panel: srcDir + '/chrome/panel.js',
  background: srcDir + '/chrome/background.js'
};

// Output paths and options
let output = {
  path: destDir,
  filename: '[name].js'
};

let resolve = {
  extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
};

// Loader definitions
let loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      presets: ['es2015', 'react', 'stage-1'],
      plugins: ['transform-object-assign', 'transform-node-env-inline']
    }
  },
  {
    test: /\.json$/,
    loaders: ['json']
  }
];

let plugins = [
  new webpack.NodeEnvironmentPlugin(),
  new webpack.DefinePlugin({
    PRODUCTION: IS_PRODUCTION
  }),
  new webpack.ProvidePlugin({
    $: 'jquery'
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
];

let debug = !IS_PRODUCTION;

let devtool = !IS_PRODUCTION ? 'source-map' : null;

if (IS_PRODUCTION) {
  plugins = plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(require('./src/config/banner'), { entryOnly: true })
  );
}

module.exports = { entry, output, resolve, debug, devtool, module: { loaders }, plugins };