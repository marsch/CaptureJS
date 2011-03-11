var path = require('path'), 
	sys = require('sys');

require.paths.unshift(path.dirname(__dirname)+'/lib');
require.paths.unshift(path.dirname(__dirname)+'/deps');

global.vows = require('vows');
global.assert = require('assert');
global.sinon = require('sinon');