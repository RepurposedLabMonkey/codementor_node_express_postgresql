// server.js
import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';
import ReflectionWithJsObject from './src/usingJSObject/controllers/Reflection.js';
import ReflectionWithDB from './src/usingDB/controllers/Reflection.js';

dotenv.config()

//this ternary operator always returns false (.TYPE = undefined)
// console.log("type: ", process.env.TYPE);
// const Reflection = process.env.TYPE === 'db' ?
	// ReflectionWithDB : ReflectionWithJsObject;
const Reflection = ReflectionWithDB; 

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
	return res.status(200).send({
		'message' : 'YAY! Congratulations! Your first endpoint is working'
	});
})

app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

app.listen(3000);
console.log('app running on port ', 3000);

