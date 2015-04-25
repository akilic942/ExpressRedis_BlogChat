var fs = require('fs');
var obj;
var file = __dirname + "wolkenkratzer.json";

fs.readFile(file, function(err, data){
  if(err) throw err;
    console.log();
    obj = JSON.parse(data);
});

for (var i = 0; i < obj.wolkenkratzer.length; i++) {
  console.log("Name: " + obj.wolkenkratzer[i].name + "\n");
  console.log("Stadt: " + obj.wolkenkratzer[i].stadt + "\n");
  console.log("Hoehe: " + obj.wolkenkratzer[i].hoehe + "m" + "\n" + "--------------------") 
};
