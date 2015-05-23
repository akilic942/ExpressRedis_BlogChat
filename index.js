var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var jsonParser = bodyParser.json();     

var dataDir = __dirname + '/DATA/';
var dataLimit = 20;



app.get('/', function(req, res){
   
    res.status(200).send('Hallo! Das ist die Aktuelle Startseite unseres Projekts') ; 
});


app.get('/rezepte/', function(req,res){
    var rezepte = dataDir + 'rezepte/'
    
    if(req.query.name !== undefined){
        fs.readdir(rezepte,function(err,files){
                if (err) throw err;
                var c=0;
                
            files.forEach(function(file){
                    c++;
                
                    fs.readFile(rezepte + file,function(err,data){
                        if (err) throw err;
                        var data = JSON.parse(data);
                        data[file]=data;
                        
                        console.log(data[file].filter(function(e, i, arr){
                        return e.name.toLowerCase() == req.query.name.toLowerCase();
                        }));
                    });
                });
            });
    }
    

});

app.get('/rezepte/:id', function(req, res){
   
    var id = req.params.id;
    var objid = id % dataLimit;
    var page = ~~(id/dataLimit);
    var rezepte = dataDir + 'rezepte/'
    
        fs.readFile(dataDir +'rezepte/'+ page +'.json', function(err, data){
            if(err) throw err;
            else {
                var data = JSON.parse(data); 
                var acceptedTypes =req.accepts(['html', 'json']);
        
                switch(acceptedTypes){
                    case 'html':
                        res.send("Name:" + data[objid].name + "\n" + "Autor:" + data[objid].autor + "\n" + "Zutaten:" + data[objid].zutaten + "\n" + "Rezept:" + data[objid].rezept).status(200);
                        break;
                    case 'json':
                        res.json(data[objid]).status(200);
                        break;
                    default:
                        res.status(406).end;
                        break;
                }
            }
        });
});


app.post('/rezepte', jsonParser, function(req, res){
});


app.delete('/rezepte/:id', function(req, res){
           fs.readFile(dataDir + id +'.json', function(err, data){
            if(err) throw err;
            else{
            var data =JSON.parse(data);}
           });
});


app.listen(3080,"localhost");