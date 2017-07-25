const process = require('process'),
config = require('../config.js'),
socketIoEmitter = require('socket.io-emitter');

var io = socketIoEmitter({host: config.redis_host, port: config.redis_port});

io.emit('action', {type: 'message', data:"Hello from another process"});

setTimeout(() => {process.exit(0)}, 1000);
