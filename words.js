// Node.js program to lookup the term in the database, collect the meanings, and send JSON to Browser
const express = require('express');
const router = express.Router(); // Express Router

const Joi = require('joi'); // // Validation using joi

const mysql = require('mysql');

// connection.connect(err => {
//     if (err) return debug('error connecting: ' + err.stack);
//     debug('connected as id ' + connection.threadId);
// });

router.use(express.json()); //Built in middleware enabling parsing of JSON in  express

router.get('/:word', (req, res) => {

    const { error } = validateWord(req.params); // Object destructuring -- result.error
    if (error) return res.status(400).send(error.details[0].message); // 400 Bad Request

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

}); // app.get();

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

}); // app.get();

function validateWord(word) {
    // validation error: // joi validation
    const schema = Joi.object({ word: Joi.string().min(1).required(), k: Joi.number() });
    return schema.validate(word);
}

module.exports = router;