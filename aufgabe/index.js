var fs = require('fs');
var file = __dirname + '/a.json';
var data = JSON.parse(data);
var savedata = __dirname + '/b.json';

fs.readFile(__dirname+"a.json", function(err, data){
  if(err){
    console.log('Error:' + err);
    return;
  }
});

for (var i = 0; i < data.a.length; i++) {
  console.log("Name: " + data.a[i].name + "\n" + "Stadt" + data.a[i].stadt + "\n" + "Hoehe: " + data.a[i].hoehe + "\n" + "--------------------") } ;

fs.writeFile( savedata, JSON.stringify(file, null, 6), function(err) {
  
if(err){
  console.log('Error:' + err);
  return;
}
  
  else{
    console.log('ok');
  }
  
});
