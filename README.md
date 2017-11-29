
**Cloned from:** https://github.com/krasimir/webpack-library-starter

# Key Updates
## Output ES5 node module files
* After build, can excute command ```node dist``` and the default ```index.js``` will execute
*  The `src/index.js`, which has ES6 `import` and `export`, is transpiled by `babel`, but not `webpack` *bundled*. It is in it's *node_modules* package state
```json
"build:main": "babel --copy-files --out-dir dist src"
```
* The *package.json* has ```"main": "dist/index.js"``` for publishing to `npm`

The non bundled *npm* module may be used in a pure ES5 environment, so we need `babel` to output ES5 modules - the default is `commonjs` - this can be overridden in `./.babelrc` if needs be using
```json
"env": {   
    "production": {
      "presets": [["es2015", { "modules": false }]]
    },
```

## UMD bundled ES5 with babel-runtime
* The browser ready **umd** files are bundled with *webpack*, and use the *webpack babel loader* and also the [Babel Runtime Transform](https://babeljs.io/docs/plugins/transform-runtime/)
  * The *babel transform runtime* needs `devDependency` and a `dependency`, and is configured in `.babelrc`
  * Required *helpers* and *polyfills* are referenced through ```node_module``` *require* imports during *transpilation*, and *webpack* bundles these runtime dependencies into the distributed *umd.js* files 
```json
["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
```

* The `dist/index.js` and it's associated files will include these `babel-runtime` helper/polyfill `require` import statments, but are not bundled with webpack

## Updated `npm run` scripts
```json
"scripts": {
    "build-all": "npm run clean && npm-run-all --parallel build:* && npm run test",
    "clean": "rimraf dist/*",
    "build:main": "babel --copy-files --out-dir dist src",
    "build:umd": "webpack --env dev",
    "build:umd.min": "webpack --env build",
    "dev:main": "babel --copy-files --out-dir dist src --watch",
    "dev:umd": "webpack --progress --colors --watch --env dev",
    "test": "mocha --require babel-core/register --colors ./test/*.spec.js",
    "test:watch": "mocha --require babel-core/register --colors -w ./test/*.spec.js"
  }
  ```

---
**Cloned from:** https://github.com/krasimir/webpack-library-starter
# Webpack library starter

Webpack based boilerplate for producing libraries (Input: ES6, Output: universal library)

Build of original upstream ![Travis](https://travis-ci.org/krasimir/webpack-library-starter.svg?branch=master)

## Features

* Webpack 3 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Process

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `yarn install` (recommended) or `npm install` to get the project's dependencies
  * Run `yarn build` or `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `yarn test` or `npm run test`

## Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
* `yarn test` or `npm run test` - well ... it runs the tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## Readings

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)

## Misc

### An example of using dependencies that shouldn’t be resolved by webpack, but should become dependencies of the resulting bundle

In the following example we are excluding React and Lodash:

```js
{
  devtool: 'source-map',
  output: {
    path: '...',
    libraryTarget: 'umd',
    library: '...'
  },
  entry: '...',
  ...
  externals: {
    react: 'react'
    // Use more complicated mapping for lodash.
    // We need to access it differently depending
    // on the environment.
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  }
}
```
