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


/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM projects', function (error, rows, fields) {
    //if (error) throw error;
    console.log('The results is: ', rows);
    res.render('dashboard', { title: 'Admin' , projects:rows});
  });
});


router.get('/new', function (req, res, next){
  connection.query('SELECT * FROM projects', function (error, rows, fields) {
      if (error) throw error;
      console.log(rows);
    res.render('new', { title: 'Newproj',  projects:rows});
  });
});

router.post('/new', function (req, res, next){
  // var multer  = require('multer');
  // var upload = multer().single('file');
  //
  // upload(req, res, function (err) {
  //   if (err) {
  //     console.log(req.file);
  //     console.log(err);
  //     return;
  //   }
  //  });
  //  res.send('Profile ok');

  var title       = req.body.title;
  var description = req.body.description;
  var service     = req.body.service;
  var client      = req.body.client;
  var date        = req.body.date;
  // var image       = req.body.projectImageName

  req.checkBody('title','Title field is requiered').notEmpty();
  req.checkBody('service','Service field is required').notEmpty();


  var errors = req.validationErrors();

  console.log("errors");
  console.log(errors);


  if(errors){

    res.render('new',{
      errors: errors,
      title: title,
      description: description,
      service: service,
      client: client,
    });
  } else {

    var project = {
      title: title,
      description: description,
      service: service,
      client: client,
      date: date,
    };



    var query = connection.query ( 'INSERT INTO projects SET ?', project, function(err,result){
      if (err) {
        console.log(err);
        res.send('db error');
      } else {
        res.redirect('/admin');
      }
    });
  }
});



//   connection.query('SELECT * FROM projects', function (error, rows, fields) {
//       console.log(rows);
//     res.render('new', { title: 'Newproj',  projects:rows});
// //   });
// // });
// router.get('/edit', function(req, res, next) {
//   connection.query('SELECT * FROM projects', function (error, rows, fields) {
//     if (error) throw error;
//     console.log('The results is: ', rows);
//     res.render('edit', { title: 'edit' , projects:rows});
//   });
// });


router.post('/edit/:id', function (req, res, next){

});

router.get('/edit/:id', function (req, res, next){
  console.log("editing");
  connection.query('SELECT * FROM projects WHERE id =' +req.params.id, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.send('db error');
    } else {
      console.log("============rows=========");
      console.log(rows);
      res.render('edit', {title:"Edit", projects:rows[0]});
    }
  });
});



//
// router.delete('/delete/:id', fuction( req, res){
//   connection.query('DELETE FROM projects WHERE id = ' + req.params.id, function(err, result){
//     if(err) throw err;
//   });
//       res.location('/admin');
//       res.redirect('/admin');
// })
//
//
//
module.exports = router;
