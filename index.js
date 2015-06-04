var express = require('express');
var bodyParser = require('body-parser');
var redis = require('redis');
var moment = require('moment');

var db = redis.createClient();
var app = express();
var date = moment().format('DD.MM.YYYY, HH:mm');

app.use(bodyParser.json());

//-------------------------------------------------------
//
//                     Post Funktion
//
//-------------------------------------------------------

// POST - Posten eines Post mit ID (nach WorkshopBeispiel)
app.post('/post', function(req, res){

  var newPost = req.body;

  db.incr('Counter:OverallPOSTS', function(err, rep){

    newPost.id = rep;
    newPost.Erstellt = date;

    db.set('Post:'+newPost.id, JSON.stringify(newPost), function(err, rep){
      res.json(newPost);
    });

  });

});

// GET - Anfragen eines Post nach ID
app.get('/post/:postid', function(req, res){
  db.get('Post:'+req.params.postid, function(err, rep){
    if(rep){
      var Post = rep;
      db.incr('Counter:OverallGET');
      db.zincrby('Counter:OnPostGET',1,'Post:'+req.params.postid);
      res.type('json').send(Post);

    }
    else {
      res.status(404).type('text').send('Diese Seite existert nicht.');
    }
  });
});

// GET - Anfrage des Posts mit meisten Anfragen
app.get('/top', function(req, res){

  if(req.query.range !== undefined){
    db.zrevrange('Counter:OnPostGET',0,req.query.range, function(err, rep){
      if (rep){
      var top =  rep;

        db.mget(top, function(err,rep){
          var Post = rep;
          if(rep){
            res.type('json').send(Post);
          }

          else {
            res.status(404).type('text').write('Diese Seite existert nicht.');
          }

          });
        };
      });
    }

    else {
      db.zrevrange('Counter:OnPostGET',0,0, function(err, rep){
        if (rep){
        var top =  rep;

        db.mget(top, function(err,rep){
          var Post = rep;
          if(rep){
            res.type('json').send(Post);
          }

          else {
            res.status(404).type('text').write('Diese Seite existert nicht.');
          }

        });
      };
    });
  };
  });

// PUT - Ändern eines Posts
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

// DELTE -  Löschen eines Posts
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
//
//                  Kommentar Funktion
//
//-------------------------------------------------------

// POST - Posten eines Kommentares zum jeweilgen Post über HASH-Keys, ermöglicht das löschen und abrufen nach ID

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

// GET - Anfragen aller Kommentare zum Post
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

// DELETE - Löschen eines Kommentare :cid aus dem Post :pid
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
