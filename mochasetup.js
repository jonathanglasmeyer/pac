require('babel-register')({
  ignore: /node_modules/,
  plugins: ['babel-plugin-espower']
})

require('babel-polyfill');
require('loud-rejection/register');

global.__DEV__ = true;

const assert = require('power-assert');
global.assert = assert;
