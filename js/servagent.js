//Module
var faye = require('faye'), fayeRedis = require('faye-redis');
var ejs = require('ejs');
var engine = require('ejs-mate');
var redis = require('redis');
var http = require('http');
var express = require('express'), helpers = require('express-helpers')(app);
var fs = require('fs');
var bodyParser = require('body-parser');

//Modul Referenzen
var db = redis.createClient();
var app = express();
var server = http.createServer(app);
var client = new faye.Client("http://localhost:3001/faye");

var bayeux = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45,

  engine: {
   type:   fayeRedis,
   host:   'localhost',
   // more options
 }
});

var publication = client.publish( 'Neuigkeiten' , function(message) {
  console.log(message);
});


bayeux.attach(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('ejs', engine);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');


// GET

app.get('/', bodyParser.json(), function(req, res){

  if(req.query.search === undefined){

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
  }

  else{
    var options = {
        host: 'localhost',
        port: '3000',
        path: '/?search='+encodeURIComponent(req.query.search),
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
  }


});

app.get('/top', bodyParser.json(), function(req, res){


    var options = {
        host: 'localhost',
        port: '3000',
        path: '/top?range=25',
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    var externalRequest = http.request(options, function(externalResponse){
      externalResponse.on('data',function(chunk){

        var data = JSON.parse(chunk);


        console.dir(data);
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


app.get('/admin/newentry', bodyParser.json(), function(req,res){

    res.render('admin/newentry');

});

app.post('/admin/newentry', function(req,res){
  var blogid = req.params.id;
    console.log(req.body);

  var postData = JSON.stringify(
    req.body
  );

  var options = {
      host: 'localhost',
      port: '3000',
      path: '/post/',
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
  res.redirect('../..');
  req.end();


});


app.get('/admin/alterentry/:id', bodyParser.json(), function(req,res){

  var blogid = req.params.id;


      if(req.query.action === undefined){
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

              res.render('admin/alterentry',{
                blogid:blogid,
                data:data
                });


            });

      });

      externalRequest.end();

      }
});

app.post('/admin/alterentry/:id', bodyParser.json(), function(req,res){
var blogid = req.params.id;

if(req.body.action == 'SaveChanges'){

  var postData = JSON.stringify(
    req.body
  );

    var options = {
        host: 'localhost',
        port: '3000',
        path: '/post/'+blogid,
        method: 'PUT',
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
    res.redirect('/blog/'+blogid);
    req.end();

}


if(req.body.action == 'Delete'){
    var options = {
        host: 'localhost',
        port: '3000',
        path: '/post/'+blogid,
        method: 'DELETE',
        headers: {
            accept: 'application/json'
        }
    };

    var externalRequest = http.request(options, function(externalResponse){

      res.redirect('../..');
      });

externalRequest.end();
}

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
  res.redirect('/blog/'+blogid);
  res.end();



});


app.get('/admin/alterentry/:id/comments', bodyParser.json(), function(req,res){
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


    res.render('admin/alterentry_comments',{
      data:data,
      blogid:blogid

    });

    });

  });
    externalRequest.end();

});

app.post('/admin/alterentry/:id/comments/:cid', bodyParser.json(), function(req,res){
var blogid = req.params.id;

  if(req.body.action == 'DeleteC'){
    var options = {
        host: 'localhost',
        port: '3000',
        path: '/post/'+blogid+'/comment/'+req.params.cid,
        method: 'delete',
        headers: {
            accept: 'application/json'
        }
    };

    var externalRequest = http.request(options, function(externalResponse){

      res.redirect('/admin/alterentry/'+req.params.id);
      });

      externalRequest.end();
    }

});


app.get('/admin/publish/:id', bodyParser.json(), function(req,res){

  var blogid = req.params.id;


      if(req.query.action === undefined){
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

              res.render('admin/publish',{
                blogid:blogid,
                data:data
                });


            });

      });

      externalRequest.end();

      }
});

app.get('/sub/news', bodyParser.json(), function(req,res){

    res.render('sub/news');

});

app.get('/sub/recipes', bodyParser.json(), function(req,res){

    res.render('sub/recipes');

});

app.get('/chat', function(req, res, next){

  if (req.query.user === undefined){
    res.redirect('/');
  }


  else {

    res.render('chat',{
      chatroom: req.query.user
    });

    }

});

// Server


server.listen(3001, function(){
  console.log("(~˘▾˘)~ Der ServiceAgent wurde Erfolgreich gestartet (localhost:3001) ~(˘▾˘~)");
});
