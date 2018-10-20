'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Reflection = require('./src/usingJSObject/controllers/Reflection.js');

var _Reflection2 = _interopRequireDefault(_Reflection);

var _Reflection3 = require('./src/usingDB/controllers/Reflection.js');

var _Reflection4 = _interopRequireDefault(_Reflection3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//make a local instance of env

//import the 'table' structures

//we need dotenv now for accessing .env
_dotenv2.default.config();
//check the env value and import the correct table structures
//'process.' becauyse thats where env was loaded by .config

//we also need babel-polyfill node can work with async/wait and Promise
// server.js

var Reflection = process.env.TYPE === 'db' ? _Reflection4.default : _Reflection2.default;

//create a local instance of express
var app = (0, _express2.default)();

//set up new 'middleware'
app.use(_express2.default.json());

//'sample endpoint' which tests if the server is running
app.get('/', function (req, res) {
	return res.status(200).send({
		'message': 'YAY! Congratulations! Your first endpoint is working'
	});
});

//testing record create (ie INSERT)
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

//get the running node server as a callback to this function
app.listen(3000);
console.log('app running on port ', 3000);