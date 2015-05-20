var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();     

var datadir = __dirname + '/DATA/';



app.get('/', function(req, res){
   res.status(200).send('Hallo! Das ist die Aktuelle Startseite unseres Projekts') ; 
});

app.post('/rezepte', jsonParser, function(req, res){
});

app.get('/rezepte/:id', function(req, res){
    var id = req.params.id;
    var objid = id % 20;
    var page = ~~(id/20);
    
    fs.readFile(datadir + page +'.json', function(err, data){
    if(err) throw err;
    else {
        var data = JSON.parse(data); 
        res.send("Name:" + data[objid].name + "\n" + "Autor:" + data[objid].autor + "\n" + "Zutaten:" + data[objid].zutaten + "\n" + "Rezept:" + data[objid].rezept);

        }
        
         
    });
  }
);


app.delete('/rezepte/:id', function(req, res){
           fs.readFile(datadir + id +'.json', function(err, data){
            if(err) throw err;
            else{
            var data =JSON.parse(data);}
           });
});

app.listen(3080,"localhost");