const express = require('express'),
  socketio = require('socket.io'),
  process = require('process'),
  config = require('../config.js'),
  path = require('path'),
  socketioRedis = require('socket.io-redis');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

io.adapter(socketioRedis({host: config.redis_host, port: config.redis_port}));
io.on('connection', (socket) => {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if(action.type === 'server/hello') {
      console.log('Got hello data!', action.data)
      socket.emit('action', {type: 'message', data:"Good day, sir!"});
    }

  });
});



