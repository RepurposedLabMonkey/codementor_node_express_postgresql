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

_dotenv2.default.config();

//this ternary operator always returns false (.TYPE = undefined)
// console.log("type: ", process.env.TYPE);
// const Reflection = process.env.TYPE === 'db' ?
// ReflectionWithDB : ReflectionWithJsObject;
// server.js
var Reflection = _Reflection4.default;

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get('/', function (req, res) {
	return res.status(200).send({
		'message': 'YAY! Congratulations! Your first endpoint is working'
	});
});

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

app.listen(3000);
console.log('app running on port ', 3000);