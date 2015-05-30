var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(bodyParser.json());

// Unveränderte Beispiele aus dem Workshop - 1, 2, 3
// 1 Posten eines Post mit ID (nach WorkshopBeispiel)
app.post('/post', function(req, res){

  var newPost = req.body;

  db.incr('ID:post', function(err, rep){

    newPost.id = rep;

    db.set('Post:'+newPost.id, JSON.stringify(newPost), function(err, rep){
      res.json(newPost);
    });

  });

});

// Posten eines Kommentares zum jeweilgen Post über HASH-Keys, ermöglicht das löschen und abrufen nach ID

app.post('/post/:postid/comment/', function(req, res){

  var newComment = req.body;

  db.exists('Post:'+req.params.postid, function(err, rep){

    if(rep){
      db.incr('counter:CommentsOnPost'+req.params.postid, function(err, rep){
          newComment.id = rep;

        db.sadd('comments:post:'+req.params.postid, newComment.id,function(err, rep){

          db.hset('comments:'+req.params.postid,newComment.id,JSON.stringify(newComment), function(err, rep){
                  res.json(newComment);
          });
        });
      });
    }

    else res.status(404).type('text').send('Es existiert kein Post, zudem sie ein Kommentar schreiben möchten');

  });
});


// 2 Anfragen aller Post //
app.get('/post/', function(err, rep){


});

// 3 Anfragen eines Post nach ID //
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

// localhost:3000 //
app.listen('3000');
