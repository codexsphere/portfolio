var express = require('express');
var router = express.Router();


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'portfolio'
});

connection.connect();



/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query('SELECT * FROM projects', function (error, rows, fields) {
    if (error) throw error;
    console.log('The results is: ', rows);
    res.render('index', { title: 'Express' , projects:rows});
  });
});
// connection.end();
module.exports = router;
