
//Module
var ejs = require('ejs');
var engine = require('ejs-mate');
var redis = require('redis');
var faye = require('faye'), fayeRedis = require('faye-redis');
var http = require('http');
var express = require('express'), helpers = require('express-helpers')(app);
var fs = require('fs');
var bodyParser = require('body-parser');



//Modul Referenzen
var app = express();


var server = http.createServer(app);
var db = redis.createClient();
  //var client = faye.Client('localhost:3000/faye');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');


// GET Post

app.get('/', bodyParser.json(), function(req, res){


    var options = {
        host: 'localhost',
        port: '3000',
        path: '/mostrecent?range=100',
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    var externalRequest = http.request(options, function(externalResponse){
      externalResponse.on('data',function(chunk){

        var data = JSON.parse(chunk);



        res.render('index', {
        data:data
        });

      });

    });

    externalRequest.end();

});





app.get('/blog/:id', bodyParser.json(), function(req, res){
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
        externalResponse.on('data',function(chunk){

          var data = JSON.parse(chunk);

          db.incr('Counter:OverallGET');
          db.zincrby('Counter:OnPostGET',1,'Post:'+req.params.id);


          res.render('blogno', {data:data,
          blogid:blogid
          });



        });

      });

      externalRequest.end();

});



app.get('/blog/:id/comments', bodyParser.json(), function(req,res){
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


    res.render('comments',{
      data:data,
      blogid:blogid

    });

    });

  });
    externalRequest.end();

});

app.post('/blog/:id/comments', function(req,res){
  var blogid = req.params.id;
    console.log(req.body);

var postData = JSON.stringify(
    req.body
  );

  var options = {
      host: 'localhost',
      port: '3000',
      path: '/post/'+blogid+'/comment',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Cache-Control': 'no-cache',

      }
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();


});



















// Server
server.listen(3001, function(){
});
  console.log("(~˘▾˘)~ Der ServiceAgent wurde Erfolgreich gestartet (localhost:3001) ~(˘▾˘~)");
