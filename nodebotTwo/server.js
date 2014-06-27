// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function(){
  console.log('Board is ready');
  var servo = new five.Servo(process.argv[2] || 10);


  //Init sockets
  socket.on('ready', function(){
    console.log('Connection detected');

    socket.on('servoChange', function(deg){

      servo.to(deg);
    });
    socket.on('disconnect', function()){
      console.log('Disconnect detected');
    }
  });
});

// Routing
app.use(express.static(__dirname + '/public'));

server.listen(3000, function(){
  console.log('Server is listen in 3000');
})
