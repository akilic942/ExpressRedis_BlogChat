var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();     // Teil des bodyParsers.. gibt Parser zurück der mit json Datein arbeitet

var file = __dirname + "DATA.json";


app.get('/', function(req, res){
   res.status(200).send('Hallo! Das ist die Aktuelle Startseite unseres Projekts'); 
});

app.get('/rezepte/:id', function(req, res){
   res.status(200).send('rezepte ' + req.params.id);
    // if ID nicht da -> push ?
});



app.listen(1939);