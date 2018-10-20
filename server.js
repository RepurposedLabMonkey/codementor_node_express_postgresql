// server.js

//bring in express and make a new instance of it
//can require 'http' and 'https' for starting the respective servers also
import express from 'express';
const app = express();

//set up new 'middleware'
app.use(express.json());

//'sample endpoint' which tests if the erver is running
app.get('/', (req,res) => {
	return res.status(200).send({
		'message' : 'YAY! Congratulations! Your first endpoint is working'
	});
})

//get the running node server as a callback to this function
app.listen(3000);
console.log('app running on port ', 3000);