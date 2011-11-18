
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app   = module.exports = express.createServer();
var io    = require('socket.io').listen(app);
var fs    = require('fs');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  process.env.TZ='America/New_York';
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);

var port = process.env.PORT || 3000;

app.listen(port);

io.set('transports', ['xhr-polling']); 
io.set('polling duration', 10);

io.sockets.on('connection', function (socket) {
  socket.on('msg-to-server', function (data) {
    console.log(data);
    io.sockets.emit('msg-to-client', data);
  });
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
