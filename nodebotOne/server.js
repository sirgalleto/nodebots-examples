// Setup basic express server
var express = require('express');
var app =  express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  console.log('Board is ready');

  io.on('connection', function(socket){
    //Init
    console.log('Conexión detectada');

    //Recibe the request pin
    socket.on('requestPin', function(pin, check){

      if(check){
        console.log('pin ' + pin +' on');
        (new five.Led(pin)).on();
      }
      else{
        console.log('pin ' +pin+ ' off');
        (new five.Led(pin)).off();
      }


    });

    socket.on('strobePin', function(pin){
      console.log('strobe pin ' + pin );
      (new five.Led(pin)).strobe(200);
    });

    //Disconect
     socket.on('disconnect', function(){
      console.log('Desconexión detectada');
    });
  });
});

// Routing
app.use(express.static(__dirname + '/public'));

server.listen(3000, function(){
  console.log('Server listen on port 3000*');
})
