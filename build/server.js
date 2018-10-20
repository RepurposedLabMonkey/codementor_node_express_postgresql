// server.js -> ES5 compatible version created by babel


//can require 'http' and 'https' for starting the respective servers also

'use strict';

//bring in express and make a new instance of it
var _express = require('express');
var _express2 = _interopRequireDefault(_express);

//???
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var app = (0, _express2.default)();

//set up new 'middleware'
app.use(_express2.default.json());

//'sample endpoint' which tests if the erver is running
app.get('/', function (req, res) {
	return res.status(200).send({ 
		'message': 'YAY! Congratulations! Your first endpoint is working.' 
	});
});

//get the running node server as a callback to this function
app.listen(3000);
console.log('app running on port ', 3000);