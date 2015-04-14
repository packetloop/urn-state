'use strict';


const path = require('path');
const webpack = require('webpack');
const embedFileSize = 65536;
const assign = require('lodash/object/assign');
const config = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
    }
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css?sourceMap'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.mp4/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
      {test: /\.svg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
      {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
      {test: /\.jpg/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
      {test: /\.gif/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
      {test: /vendor\/d3\.js$/, loaders: ['smash']},
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=' + embedFileSize
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [new RegExp(path.join(__dirname, 'src'))]
      }
    ]
  },
  node: {
    __filename: true
  },
  stats: {
    colors: true
  },
  eslint: {
    configFile: 'src/.eslintrc'
  }
};

const production = assign({}, config, {
  plugins: config.plugins.concat(new webpack.NoErrorsPlugin()),
  module: assign({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel'],
      include: [new RegExp(path.join(__dirname, 'src'))]
    })
  }),
  eslint: assign({}, config.eslint, {emitError: true})
});

const development = assign({}, config, {
  entry: config.entry.concat([
    'webpack-dev-server/client?http://localhost:3010',
    'webpack/hot/only-dev-server'
  ]),
  plugins: config.plugins.concat(new webpack.HotModuleReplacementPlugin()),
  module: assign({}, config.module, {
    loaders: config.module.loaders.concat({
      test: /\.js$/,
      loaders: ['babel', 'react-hot'],
      include: [new RegExp(path.join(__dirname, 'src'))]
    })
  }),
  devtool: 'eval'
});


module.exports = production;
module.exports.development = development;
