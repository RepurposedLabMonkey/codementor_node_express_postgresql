// src/usingDB/controllers/Reflection.js
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Reflection = {
/**
* Create A Reflection
* @param {object} req 
* @param {object} res
* @returns {object} reflection object 
*/
async create(req, res) {
    // console.log("made it to reflection.create")
    
    const text = `INSERT INTO
        reflections(id, success, low_point, take_away, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
     uuidv4(),
     req.body.success || "empty",
     req.body.low_point || "empty",
     req.body.take_away || "empty",
     moment(new Date()),
     moment(new Date())
    ];

    console.log("values0: ", values[0]);
    console.log("values1: ", values[1]);
    console.log("values2: ", values[2]);
    
    try {
        const { rows } = await db.query(text, values);
        console.log('try and ye shall succeed');
    } catch(error) {
        console.log('failed again dangnabit');
        return res.status(400).send(error);
    }
},
/**
* Get All Reflection
* @param {object} req 
* @param {object} res 
* @returns {object} reflections array
*/
async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections';
    try {
     const { rows, rowCount } = await db.query(findAllQuery);
     return res.status(200).send({ rows, rowCount });
    } catch(error) {
     return res.status(400).send(error);
    }
},
/**
* Get A Reflection
* @param {object} req 
* @param {object} res
* @returns {object} reflection object
*/
async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1';
    try {
     const { rows } = await db.query(text, [req.params.id]);
     if (!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
     }
     return res.status(200).send(rows[0]);
    } catch(error) {
     return res.status(400).send(error)
    }
},
/**
* Update A Reflection
* @param {object} req 
* @param {object} res 
* @returns {object} updated reflection
*/
async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
//     const updateOneQuery =`UPDATE reflections
//      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
//      WHERE id=$5 returning *`;

    try {
     const { rows } = await db.query(findOneQuery, [req.params.id]);
     if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
     }
     const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        moment(new Date()),
        req.params.id
     ];

    // console.log("values0: ", values[0]);
    // console.log("values1: ", values[1]);
    // console.log("values2: ", values[2]);
    // console.log("values3: ", values[3]);
    // console.log("values4: ", values[4]);

    ///reporting block
    // console.log("");

    //const gluedString = ("UPDATE reflections SET success='",values[0],"',low_point ='",values[1],"',take_away='",values[2],"',modified_date='", values[3],"'");
    // console.log("UPDATE reflections SET success='"+values[0]+"',low_point ='",values[1],"',take_away='",values[2],"',modified_date='", values[3],"'");
    // console.log("oneUpdateQuery param: ", gluedString);
    // console.log("");

    // const updateOneQuery = 'UPDATE reflections SET success="did we make it?",low_point="testing low",take_away="fish and chips",modified_date = $4)';
    // const updateOneQuery = ('UPDATE reflections SET success="did we make it?",low_point="testing low",take_away="fish and chips"', values[3], ')');
    // console.log("oneUpdateQuery literal: ", updateOneQuery);


     const response = await db.query(updateOneQuery, values);
     return res.status(200).send(response.rows[0]);
    } catch(err) {
     return res.status(400).send(err);
    }
},
/**
* Delete A Reflection
* @param {object} req 
* @param {object} res 
* @returns {void} return statuc code 204 
*/
async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    try {
     const { rows } = await db.query(deleteQuery, [req.params.id]);
     if(!rows[0]) {
        return res.status(404).send({'message': 'reflection not found'});
     }
     return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
     return res.status(400).send(error);
    }
}
}
export default Reflection;
