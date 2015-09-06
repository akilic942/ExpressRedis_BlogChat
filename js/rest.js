// Rest Client "Accuratus"
//
//
//

// Module
var redis = require('redis'), search = require('reds');
var express = require('express'), partialResponse = require('express-partial-response');
var bodyParser = require('body-parser');
var moment = require('moment');
var _und = require('underscore');

// Modul Referenzen
var db = redis.createClient();
var app = express();
var date = moment().format('DD.MM.YYYY, HH:mm');
var search = search.createSearch('search');

// Client Optionen
app.use(bodyParser.json());
app.use(partialResponse());



//-------------------------------------------------------
//
//						 Post Funktion (Erstellen eines Beitrags)
//
//-------------------------------------------------------

// POST - Posten eines Post mit ID (nach WorcokshopBeispiel)

app.post('/post', function(req, res){

	var newPost = req.body;

	//posten in die Datenbank
	db.incr('Counter:OverallPOSTS', function(err, rep){

		newPost.id = rep;
		newPost.Erstellt = date;

		db.set('Post:'+newPost.id, JSON.stringify(newPost), function(err, rep){
			res.json(newPost);

			db.lpush('List:Posts','Post:'+newPost.id, function(err,rep){
			});
		});
	});
});

// GET - Anfragen eines Post nach ID

app.get('/post/:postid', function(req, res){
	db.get('Post:'+req.params.postid, function(err, rep){
		if(rep){
			var Post = rep;

			res.status(200).json(JSON.parse(Post));

		}
		else {
			res.status(404).type('text').send({response:'Diese Seite existiert nicht. ¯_(ツ)_/¯'});
		}
	});
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
				res.status(404).type('text').send('Der Post ist nicht vorhanden ¯_(ツ)_/¯');
		}
	});
});

// DELETE -	Löschen eines Posts mit ihren Kommentaren

app.delete('/post/:postid',function(req, res){

	db.del('Post:'+req.params.postid, function(err,rep){
		if(rep){
			db.del('Comments:post:'+req.params.postid,function(err,rep){
				db.del('Comments:'+req.params.postid, function(err,rep){
					db.lrem('List:Posts', 0,'Post:'+req.params.postid,function(err,rep){
					res.status(200).type('text').send('ok');
					});
				});
			});
		}

		else{
			res.status(404).type('text').send('post nicht vorhanden ¯_(ツ)_/¯');
		}
	});
});

// GET /top - Anfrage des Posts mit meisten Anfragen
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
						res.status(404).type('text').send({response: 'Keine Posts verfügbar'});					}

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
						res.status(404).type('text').send({response: 'Keine Posts verfügbar'});
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
						res.status(404).type('text').send({response: 'Keine Posts verfügbar'});
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
						res.status(404).type('text').send({response: 'Keine Posts verfügbar'});
					}
				});
		});
	}


});






//-------------------------------------------------------
//
//									Kommentar Funktion
//
//-------------------------------------------------------

// POST - Posten eines Kommentares zum jeweilgen Post über HASH-Keys, ermöglicht das löschen und abrufen nach ID

app.post('/post/:postid/comment/', function(req, res){

	var newComment = req.body;
		newComment.ErstelltAm = date;

		db.exists('Post:'+req.params.postid, function(err, rep){

			if(rep){
				db.incr('CounterOnPost:'+req.params.postid+':Comments', function(err, rep){
					cid = rep;
					newComment.id = rep;

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
        var comments = [];
				var i = _und.forEach(rep, function(rep){
					comments.push(rep);
				});
        var c = comments.map(JSON.parse);
				res.json(c);
		}

		else {
			res.status(404).type('text').send({response: 'Keine Kommentare verfügbar'});
		}
	});
});

// DELETE - Löschen eines Kommentare :cid aus dem Post :pid

app.delete('/post/:pid/comment/:cid',function(req, res){

		db.SREM('Comments:post:'+req.params.pid, req.params.cid, function(err, rep){
			if(rep===0)res.status(400).type('text').send('klapptnicht');
			else{

				db.HDEL('Comments:'+req.params.pid, req.params.cid, function(err, rep){
					res.status(200).type('text').send('Erfolgreich gelöscht!');
				});
			}
		});
});

// GET - Anfrage des Posts mit meisten Anfragen

app.get('/topcommented', function(req, res){

	if(req.query.range !== undefined){
		db.zrevrange('Counter:OnPostCOMMENTS',0,req.query.range, function(err, rep){
			if (rep){
			var top =	rep;

				db.mget(top, function(err,rep){
					var Post = rep;
					if(rep){
						res.json(rep.map(JSON.parse));
					}

					else {
						res.status(404).type('text').write('Diese Seite existiert nicht.');
					}

					});
				}
			});
		}

		else {
			db.zrevrange('Counter:OnPostCOMMENTS',0,0, function(err, rep){
				if (rep){
				var top =	rep;

				db.mget(top, function(err,rep){
					var Post = rep;
					if(rep){
						res.json(Post.map(JSON.parse));
					}

					else {
						res.status(404).type('text').write('Diese Seite existiert nicht.');
					}

				});
			}
		});
	}
	});

//-------------------------------------------------------
//
//									Such Funktion /?search=
//
//-------------------------------------------------------
app.get('/',function(req,res){

	if(req.query.search !== undefined){
	db.lrange('List:Posts',0,-1,function(err,rep){
		if (err){res.status(404).type('text').send({response:'Diese Seite existiert nicht. ¯_(ツ)_/¯'});
}		var list = rep; //map -> rep - JSON.parse //


			if (rep === null) {
				return res.status(404).type('text').send({response:'Es existieren keine Eintraege ¯_(ツ)_/¯'});
			}


		db.mget(list,function(err,rep){

			if (rep === undefined) {
			return res.status(404).type('text').send({response:'Es existieren keine Eintraege ¯_(ツ)_/¯'});
			}


			console.dir(postindex);


			var postindex = rep;
			postindex.map(function(){
				if(err){res.status(404).type('text').send({response:'Diese Seite existiert nicht. ¯_(ツ)_/¯'});}

				JSON.parse;}

			);
			postindex.forEach(function(str, i){ search.index(str, i); });


			search.query(query = req.query.search).end(function(err, ids){

						if (err) throw err;
						var i = 0;
						var results= [];

						ids.forEach(function(id){
							results[i++] = postindex[id];
						});

						res.json(results.map(JSON.parse));

						return;
				});
		});
	});
			}
});


//-------------------------------------------------------
// localhost:3000 //

app.listen(3000, function() {
	console.log('(~˘▾˘)~ Der Rest-Service wurde Erfolgreich gestartet (localhost:3000) ~(˘▾˘~)');
});
