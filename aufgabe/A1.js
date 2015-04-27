var fs = require('fs');

var file = __dirname + "wolkenkratzer.json";

fs.readFile('wolkenkratzer.json', function(err, data){
  if(err) throw err;
   else { var obj = JSON.parse(data)  ;
        }

    console.log(obj.wolkenkratzer.Name);
});

