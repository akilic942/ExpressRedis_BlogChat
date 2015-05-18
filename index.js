var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();     

var datadir = __dirname + '/DATA/';



app.get('/', function(req, res){
   res.status(200).send('Hallo! Das ist die Aktuelle Startseite unseres Projekts'); 
});

app.post('/rezepte', jsonParser, function(req, res){
    //data.push(req.body);
});

app.get('/rezepte/:id', function(req, res){
    var id = req.params.id;
    res.status(200);
    
    fs.readFile(datadir + id +'.json', function(err, data){
    if(err) throw err;
    else {
        console.dir(data);
        var data = JSON.parse(data); 
      console.log(data);
        data.Rezepte.forEach(function(obj){
         console.log("Name: " + obj.name);
        });
         
    };
  }
);
});







app.listen(3080,"localhost");