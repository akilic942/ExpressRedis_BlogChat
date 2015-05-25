var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(bodyParser.json());

//Posten eines Rezepts mit ID (nach WorkshopBeispiel) //
app.post('/rezept', function(req,res){

  var newPost = req.body;

  db.incr('id:rezept', function(err,rep){

    newPost.id = rep;

    db.set('Rezept:' +newPost.id , JSON.stringify(newPost), function(err,rep){
      res.json(newUser);
    });

  });

});

// localhost:3080 //
app.listen('3030');
