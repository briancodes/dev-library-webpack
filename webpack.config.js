/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = process.env.NODE_ENV; // using cross-env for cross platform env vars
const PACKAGE = require('./package.json');

let libraryName = PACKAGE.name;
/** Source folder and file, relative to the __dirname e.g. src/index.js */
let sourceEntry = path.join(PACKAGE.customfields.sourceFolder, PACKAGE.customfields.mainFile);
let outputFolder = PACKAGE.customfields.outputFolder;
let globalName = PACKAGE.customfields.globalName;
let plugins = [], outputFile;

console.log('sourceEntry relative: ', sourceEntry);
console.log('outputFolder: ', outputFolder);

// This will create our bundled UMD files. Suitable for the browser and
// as imported npm module.
// We will run Babel without Webpack to export the node_module targeted
// files that will be published to npm
if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true, sourceMap: true }));
  outputFile = libraryName + '.umd.min.js';
} else {
  outputFile = libraryName + '.umd.js';
}

console.log('Env: ' + env + ', Output File: ' + outputFile);
console.log('config.entry: ', path.resolve(__dirname, sourceEntry));
console.log('config.output.path: ', path.resolve(__dirname, outputFolder));

const config = {
  entry: path.resolve(__dirname, sourceEntry),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, outputFolder),
    filename: outputFile,
    library: globalName, // e.g. will be window.<globalName>
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
    // Giving percedence to the source folder, then node_modules
    // see: https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: [path.resolve(__dirname, PACKAGE.customfields.sourceFolder), 'node_modules'],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

console.log('Log of config.module.resolve: ', config.resolve);

module.exports = config;
