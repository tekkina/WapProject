
const express = require('express');
const router = express.Router(); 

const Joi = require('joi'); // // Validation using joi

const mysql = require('mysql');


router.use(express.json()); 

router.get('/:word', (req, res) => {

    const { error } = validateWord(req.params); // Object destructuring -- result.error
    if (error) return res.status(400).send(error.details[0].message); 

    var connection = mysql.createConnection({
  host: "localhost",
  user: "tekeste12",
  password: "tekeste1234",
  database:'entries',
    });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM entries WHERE word like "${req.params.word}%"`, (err, result, fields) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
    });

}); 

router.get('/:word/:k', (req, res) => {

    const { error } = validateWord(req.params); // Object destructuring -- result.error
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'tekeste12',
        password: 'tekeste1234',
        database: 'entries'
    });

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(`SELECT * FROM entries WHERE word like "${req.params.word}%" LIMIT ${req.params.k}`, (err, result, fields) => {
            if (err) throw err;
            res.send(result);
            console.log(result);
        });
    });

}); 

function validateWord(word) {
    const schema = Joi.object({ word: Joi.string().min(1).required(), k: Joi.number() });
    return schema.validate(word);
}

module.exports = router;