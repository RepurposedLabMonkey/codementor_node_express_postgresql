// server.js
//import the Reflection controller
import Reflection from './src/controllers/Reflection';

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

//testing all the endpoints in the Reflection model
app.post('/api/v1/reflections', Reflection.create);
app.get('/api/v1/reflections', Reflection.getAll);
app.get('/api/v1/reflections/:id', Reflection.getOne);
app.put('/api/v1/reflections/:id', Reflection.update);
app.delete('/api/v1/reflections/:id', Reflection.delete);

//get the running node server as a callback to this function
app.listen(3000);
console.log('app running on port ', 3000);
