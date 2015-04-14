'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js').development;

const server = new WebpackDevServer(webpack(config), {
  contentBase: 'src/static/',
  stats: {
    // Do not show list of hundreds of files included in a bundle
    chunkModules: false,
    colors: true
  },
  publicPath: '/assets/',
  hot: true
});

server.use('/', (req, res) => res.sendFile(path.join(__dirname, '/src/static/index.html')));

server.listen(3010, '0.0.0.0', err =>
  err ? console.error(err) : console.log('Listening on http://0.0.0.0:3010'));
