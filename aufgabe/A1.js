var fs = require('fs');

var file = __dirname + "/JSON/wolkenkratzer.json";


fs.readFile(file, function(err, data){
  if(err) throw err;
   else { var obj = JSON.parse(data)  ;
        } 
    
   obj.wolkenkratzer.forEach(function (a) {
       console.log("Name: " + a.name);
       console.log("Stadt: " + a.stadt);
       console.log("Hoehe: " + a.hoehe);
       console.log("--------");
       console.log();
   })
});

 