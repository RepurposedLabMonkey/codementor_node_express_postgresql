// server.js

import express from 'express';
//we need dotenv now for accessing .env
import dotenv from 'dotenv';
//we also need babel-polyfill node can work with async/wait and Promise
import 'babel-polyfill';
//import the 'table' structures
import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection.js';
import ReflectionWithDB from './src/usingDB/controllers/Reflection.js';

//make a local instance of env
dotenv.config();
//check the env value and import the correct table structures
//'process.' becauyse thats where env was loaded by .config
const Reflection = process.env.TYPE === 'db' ?
	ReflectionWithDB : ReflectionWithJsObject;

	//create a local instance of express
const app = express();

//set up new 'middleware'
app.use(express.json());

//'sample endpoint' which tests if the server is running
app.get('/', (req,res) => {
	return res.status(200).send({
		'message' : 'YAY! Congratulations! Your first endpoint is working'
	});
})

//testing record create (ie INSERT)
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

//get the running node server as a callback to this function
app.listen(3000);
console.log('app running on port ', 3000);

