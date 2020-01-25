var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  socket.on('join', function(room){
    socket.join(room);
  });
  
  socket.on('event', function(room, event, data){
    io.in(room).emit(event, data);
  });
  
  socket.on('leave', function(room2){
    socket.leave(room2);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
