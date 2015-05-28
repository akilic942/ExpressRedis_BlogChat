var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(bodyParser.json());

// Unveränderte Beispiele aus dem Workshop - 1, 2, 3 //
// 1 Posten eines Rezepts mit ID (nach WorkshopBeispiel) //
app.post('/rezept', function(req, res){

  var newPost = req.body;

  db.incr('ID:rezept', function(err, rep){

    newPost.id = rep;

    db.set('Rezept:'+newPost.id, JSON.stringify(newPost), function(err, rep){
      res.json(newPost);
    });

  });

});

// Posten eines Kommentares zum jeweilgen Post //

app.post('/rezept/:postid/comment/', function(req, res){

  var newComment = req.body;

  db.exists('Rezept:'+req.params.postid, function(err, rep){

    if(rep){
      db.incr('ID_comment:'+req.params.postid, function(err, rep){
        newComment.id = rep;

        db.lpush('Kommentare zu Rezept:'+req.params.postid, JSON.stringify(newComment), function(err, rep){
          res.json(newComment);
        });
      });
    }

    else res.status(404).type('text').send('Es existiert kein Rezept, zudem sie ein Kommentar schreiben möchten');
  });
});


// 2 Anfragen aller Rezepte //
app.get('/rezept/', function(err, rep){


});

// 3 Anfragen eines Rezepts nach ID //
app.get('/rezept/:id', function(req, res){

  db.get('Rezept:'+req.params.id, function(err, rep){
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
