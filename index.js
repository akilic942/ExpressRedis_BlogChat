var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var moment = require('moment');

var db = redis.createClient();
var app = express();
var date = moment().format('DD.MM.YYYY, HH:mm');

app.use(bodyParser.json());

//-------------------------------------------------------
// Post Funktion
//-------------------------------------------------------
// Posten eines Post mit ID (nach WorkshopBeispiel)
app.post('/post', function(req, res){

  var newPost = req.body;

  db.incr('Counter:OverallPOSTS', function(err, rep){

    newPost.id = rep;
    newPost.ErstelltAm = date;

    db.set('Post:'+newPost.id, JSON.stringify(newPost), function(err, rep){
      res.json(newPost);
    });

  });

});

// Anfragen eines Post nach ID //
app.get('/post/:id', function(req, res){
  db.get('Post:'+req.params.id, function(err, rep){
    if(rep){
      var Post = rep;
      db.incr('Counter:OverallGET');
      db.zincrby('Counter:OnPostGET',1,'Post:'+req.params.id);
      res.type('json').send(Post);

    }
    else {
      res.status(404).type('text').send('Diese Seite existert nicht.');
    }
  });
});

// Ändern eines Posts
app.put('/post/:postid', function (req,res){

  db.exists('Post:'+req.params.postid, function(err,rep){
    if (rep){
      var updatedPost = req.body;
      updatedPost.id = req.params.postid;
      updatedPost.LastEdited = date;

      db.set('Post:'+req.params.postid, JSON.stringify(updatedPost), function(err, rep){
        res.json(updatedPost);
      });
    }

    else{
        res.status(404).type('text').send('Der Post ist nicht vorhanden')
    }
  });
});

// Löschen eines Posts
app.delete('/post/:postid',function(req, res){
  db.del('Post:'+req.params.postid, function(err,rep){
    if(rep){
      res.status(200).type('text').send('ok');
    }

    else{
      res.status(404).type('text').send('post nicht vorhanden');
    }
  })
});

//-------------------------------------------------------
// Kommentar Funktion
//-------------------------------------------------------
// Posten eines Kommentares zum jeweilgen Post über HASH-Keys, ermöglicht das löschen und abrufen nach ID

app.post('/post/:postid/comment/', function(req, res){

  var newComment = req.body;
  newComment.ErstelltAm = date;

  db.exists('Post:'+req.params.postid, function(err, rep){

    if(rep){
      db.zincrby('Counter:OnPostCOMMENTS',1,'Post:'+req.params.postid, function(err, rep){
        cid = rep;

        db.sadd('Comments:post:'+req.params.postid, cid,function(err, rep){

          db.hset('Comments:'+req.params.postid, cid, JSON.stringify(newComment), function(err, rep){
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
  db.hgetall('Comments:'+req.params.id, function(err, rep){
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

    db.SREM('Comments:post:'+req.params.pid, req.params.cid, function(err, rep){
      if(rep==0)res.status(400).type('text').send('klapptnicht');
      else{
        db.HDEL('Comments:'+req.params.pid, req.params.cid, function(err, rep){
        res.status(200).type('text').send('Erfolgreich gelöscht!')
    });
    }
  });
});

//-------------------------------------------------------

// localhost:3000 //
app.listen('3000');
