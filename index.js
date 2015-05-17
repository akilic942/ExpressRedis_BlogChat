var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();     

var datadir = __dirname + '/DATA/';



app.get('/', function(req, res){
   res.status(200).send('Hallo! Das ist die Aktuelle Startseite unseres Projekts'); 
});

app.get('/rezepte/:id', function(req, res){
    res.status(200).json(fs.readFile(datadir + req.params.id +'.json', function(err, data){
    if(err) throw err;
    else {
        var data = JSON.parse(data);        
    };
  })
);
});



app.listen(3080,"localhost");