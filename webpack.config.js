/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'library';
// Relative to the __dirname, the main project folder
let sourceEntry = '/src/index.js';
let outputFolder = '/dist';

let plugins = [], outputFile;

// This will create our bundled UMD files. Suitable for the browser as wall
// as imported as a self cocntained module.
// We will run Babel without Webpack to export the node_module targeted
// files that will be published to npm (not webpack bundled usising script build:main)
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true, sourceMap: true }));
  outputFile = libraryName + '.umd.min.js';
} else {
  outputFile = libraryName + '.umd.js';
}

console.log('Env: ' + env + ', Output File: ' + outputFile);

const config = {
  entry: __dirname + sourceEntry,
  devtool: 'source-map',
  output: {
    path: __dirname + outputFolder,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
