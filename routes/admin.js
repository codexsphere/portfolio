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
    if (error) throw error;
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

            console.log (req.body.title)
            console.log(req.body.description);
            console.log(req.body.service);
            console.log(req.body.client);
    //console.log(req.body.projectimage);
            console.log(req.body.date);

            res.json(req.body);


    // req.checkBody('tile','Title field is requiered').notEmpty();
    // req.checkBody('service','Service field is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){

      res.render('new',{
        errors: errors,
        title: title,
        description: description,
        service: service,
        client: client,
      });
    }else{

      var project = {
        title: title,
        description: description,
        service: service,
        client: client,
        date: projectdate,
        image: projectImageName,
      };

      var query = connection.query ( 'INSERT INTO project SET ?', project, function(err,result){

      });
      request.flash('succes', 'Project Added');

      res.location('/admin');
      res.redriect('/admin');

    }

  });

  module.exports = router;
  //   connection.query('SELECT * FROM projects', function (error, rows, fields) {
  //       console.log(rows);
  //     res.render('new', { title: 'Newproj',  projects:rows});
  //   });
  // });

//
// router.get('/edit/:id', function (req, res, next){
//   connection.query('SELECT * FROM projects WHERE id =' +req.params.id, function (error, rows, fields) {
//       if (error) throw error;
//       console.log(rows);
//       if (error) throw error;
//     res.render('edit', {"rows":row[0], projects:rows});
//   });
// });
//
