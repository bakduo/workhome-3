var express = require('express');

var fs = require('fs');

var app = express.createServer(express.logger());

var error = 0;

var buffer_datos_index;

fs.exists('index.html', function(exists) {
   if (exists){
      fs.stat('index.html', function(error, stats) {
          buffer_datos_index = fs.readFileSync('index.html'); //If the encoding option is specified then this function returns a string. Otherwise it returns a buffer.
          //var txt = bufferX.toString('utf8');
          //buf = new Buffer(stats.size);
          //buf.write(txt,stats.size);
          //console.log(txt);
          //console.log(buf.toString('utf8'));
      });
     }else{
      error = 1;
     }
});

app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "/css")); //use static files in ROOT/public folder

app.get('/', function(request, response) {

  if (error == 1){ 
        response.send('Hello World work home 3!');
  }else{
        response.send(buffer_datos_index.toString('utf8'));
  }
  //response.send('Hello World work home 3!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
