
//Module
var ejs = require('ejs');
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
  //var client = faye.Client('localhost:3000/faye');


// GET Post

app.get('/', jsonParser, function(req, res){
  fs.readFile('./js/service/allpost.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err)
      throw err;

    else {

      var options = {
          host: 'localhost',
          port: '3000',
          path: '/post/1',
          method: 'GET',
          headers: {
              accept: 'application/json'
          }
      };

      var externalRequest = http.request(options, function(externalResponse){
        console.log('external Connected');
        externalResponse.on('data',function(chunk){

          var data = JSON.parse(chunk);

          var html = ejs.render(filestring, data);
          res.setHeader('content-type', 'text/html');
          res.writeHead(200);
          res.write(html);
          res.end();

        });

      });

      externalRequest.end();

    }

  });

});
























// Server
server.listen(3001, function(){
  console.log("Der ServiceAgent wurde Erfolgreich gestartet :3");
});
