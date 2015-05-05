var fs = require('fs');
var file = __dirname + "wolkenkratzer.json";
var data;

fs.readFile('/wolkenkratzer.json', 'utf8', function(err, data){
    if(err) throw err;
    data = JSON.parse(data);
});

for (var i = 0; i < data.wolkenkratzer.length; i++) {
  console.log("Name: " + data.wolkenkratzer[i].name + "\n");
  console.log("Stadt: " + data.wolkenkratzer[i].stadt + "\n");
  console.log("Hoehe: " + data.wolkenkratzer[i].hoehe + "m" + "\n" + "--------------------") 
};
