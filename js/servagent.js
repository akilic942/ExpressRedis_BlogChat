
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
var db = redis.createClient();
  //var client = faye.Client('localhost:3000/faye');


// GET Post

app.get('/blog/:id', jsonParser, function(req, res){
  var blogid = req.params.id;

  fs.readFile('./js/service/blogno.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err)
      throw err;

    else {

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

app.get('/top', function(req, res){

	if(req.query.range !== undefined){
		db.zrevrange('Counter:OnPostGET',0,req.query.range, function(err, rep){
			if (rep){
			var top =	rep;

				db.mget(top, function(err,rep){
					var Post = rep;
					if(rep){
						res.json(rep.map(JSON.parse));
					}

					else {
						res.status(404).type('text').send('Diese Seite existert nicht.');
					}

					});
				}
			});
		}

		else {
			db.zrevrange('Counter:OnPostGET',0,0, function(err, rep){
				if (rep)				{
				var top =	rep;

				db.mget(top, function(err,rep){
					var Post = rep;
					if(rep){
						res.json(Post.map(JSON.parse));
					}

					else {
						res.status(404).type('text').send('Diese Seite existert nicht.');
					}

				});
			}
		});
	}
	});


// GET MostRecent - Anfrage des juengsten (bzw. neuesten) Post

app.get('/mostrecent', function(req,res){

	if(req.query.range !== undefined){
		db.lrange('List:Posts',0,req.query.range,function(err,rep){
			var recent = rep;
				db.mget(recent, function(err, rep){
					if(rep){
						res.json(rep.map(JSON.parse));
					}
					else{
						res.status(404).send("Fehler");
					}
				});
		});
	}

	else{
		db.lrange('List:Posts',0,0,function(err,rep){
			var recent = rep;
				db.get(recent, function(err, rep){
					if(rep){
						res.json(rep.map(JSON.parse));
					}
					else{
						res.status(404).send("Fehler");
					}
				});
		});
	}


});
























// Server
server.listen(3001, function(){
  console.log("Der ServiceAgent wurde Erfolgreich gestartet :3");
});
