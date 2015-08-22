
//Module
var ejs = require('ejs');
var engine = require('ejs-mate');
var redis = require('redis');
var faye = require('faye'), fayeRedis = require('faye-redis');
var http = require('http');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

//Modul Referenzen
var app = express();


var server = http.createServer(app);
var jsonParser = bodyParser.json();
var db = redis.createClient();
  //var client = faye.Client('localhost:3000/faye');

app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');


// GET Post

app.get('/', jsonParser, function(req, res){

    res.render('index');

  });


app.get('/blog/:id', jsonParser, function(req, res){
  var blogid = req.params.id;

      var options = {
          host: 'localhost',
          port: '3000',
          path: '/post/'+blogid,
          method: 'GET',
          headers: {
              accept: 'application/json'
          }
      };

      var externalRequest = http.request(options, function(externalResponse){
        console.log('external Connected');
        externalResponse.on('data',function(chunk){

          var data = JSON.parse(chunk);

          console.dir(data);
          db.incr('Counter:OverallGET');
          db.zincrby('Counter:OnPostGET',1,'Post:'+req.params.id);


          res.render('blogno', data);



        });

      });

      externalRequest.end();

});



app.get('/blog/:id/comments', jsonParser, function(req,res){
  var blogid = req.params.id;

  var options = {
      host: 'localhost',
      port: '3000',
      path: '/post/'+blogid+'/comment',
      method: 'GET',
      headers: {
          accept: 'application/json'
      }
  };

  var externalRequest = http.request(options, function(externalResponse){
    console.log('external Connected');
    externalResponse.on('data',function(chunk){

      var data = JSON.parse(chunk);

    console.dir(data);

    res.render('comments',{data:data});

    });

  });
    externalRequest.end();

});



















// Server
server.listen(3001, function(){
});
  console.log("(~˘▾˘)~ Der ServiceAgent wurde Erfolgreich gestartet (localhost:3001) ~(˘▾˘~)");
