'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'prod';

const srcDir = path.join(__dirname, 'src');
const destDir = path.resolve(__dirname, (IS_PRODUCTION ? 'dist' : 'compiled'));

// Define entry points
let entry = {
  vendor: ['react', 'immutable'],
  devtools: srcDir + '/chrome/devtools.js',
  panel: srcDir + '/chrome/panel.js',
  background: srcDir + '/chrome/background.js',
  main: './index.js'
};

// Output paths and options
let output = {
  path: destDir,
  filename: '[name].js'
};

let loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      presets: ['es2015', 'react', 'stage-1']
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
];

let preLoaders = [

];

let modules = { loaders, preLoaders };

let plugins = [
  new webpack.DefinePlugin({
    PRODUCTION: IS_PRODUCTION
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity
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

if (IS_PRODUCTION) {
  plugins = plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(require('./src/contrib/banner'), { entryOnly: true }),
    new ExtractTextPlugin('manifest.json')
  );
}

module.exports = { entry, output, module: modules, plugins };