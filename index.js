var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(bodyParser.json());

//-------------------------------------------------------
// Post Funktion
//-------------------------------------------------------
// Posten eines Post mit ID (nach WorkshopBeispiel)
app.post('/post', function(req, res){

  var newPost = req.body;

  db.incr('Counter:PostsOverall', function(err, rep){

    newPost.id = rep;

    db.set('Post:'+newPost.id, JSON.stringify(newPost), function(err, rep){
      res.json(newPost);
    });

  });

});

// Anfragen eines Post nach ID //
app.get('/post/:id', function(req, res){

  db.get('Post:'+req.params.id, function(err, rep){
    if(rep){
      res.type('json').send(rep);
    }
    else {
      res.status(404).type('text').send('Diese Seite existert nicht.');
    }
  });
});

//-------------------------------------------------------
// Kommentar Funktion
//-------------------------------------------------------
// Posten eines Kommentares zum jeweilgen Post über HASH-Keys, ermöglicht das löschen und abrufen nach ID

app.post('/post/:postid/comment/', function(req, res){

  var newComment = req.body;

  db.exists('Post:'+req.params.postid, function(err, rep){

    if(rep){
      db.incr('CounterComments:OnPost'+req.params.postid, function(err, rep){
        cid = rep;

        db.sadd('comments:post:'+req.params.postid, cid,function(err, rep){

          db.hset('comments:'+req.params.postid, cid, JSON.stringify(newComment), function(err, rep){
                  res.json(newComment);
          });
        });
      });
    }

    else res.status(404).type('text').send('Es existiert kein Post, zudem sie ein Kommentar schreiben möchten');

  });
});

// Anfragen aller Kommentare zum Post
app.get('/post/:id/comment/', function(req, res){
  db.hgetall('comments:'+req.params.id, function(err, rep){
    if(rep){
      res.type('json').send(rep);
    }

    else {
      res.status(404).type('text').send('Keine kommentare verfügbar')
    }
  })
});

//Löschen eines Kommentare :cid aus dem Post :pid
app.delete('/post/:pid/comment/:cid',function(req, res){

    db.SREM('comments:post:'+req.params.pid, req.params.cid, function(err, rep){
      if(rep==0)res.status(400).type('text').send('klapptnicht');
      else{
        db.HDEL('comments:'+req.params.pid, req.params.cid, function(err, rep){
        res.status(200).type('text').send('Erfolgreich gelöscht!')
    });
    }
  });
});

//-------------------------------------------------------

// localhost:3000 //
app.listen('3000');
