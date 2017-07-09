
/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var sio = require('socket.io');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var port = 3000;
if (process.argv.length == 3){
    port = parseInt(process.argv[2]);
}
var router = express.Router();

var app = express();
var server = http.createServer(app);

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

if('development' == app.get('env')) {
    app.use(errorhandler({ log: true }));
}

if('production' == app.get('env')) {
    app.use(errorhandler());
}

router.get('/', function(req, res){
    res.render('index', {
        title: 'Express'
    });
});

app.use('/', router);

server.listen(port);
var currentID = 0;
var io = sio.listen(server);

io.sockets.on('connection', function (socket) {
	socket.userID = ++currentID;
	socket.emit('user count', currentID - 1);
	socket.broadcast.emit('user joined', socket.userID);
	
	socket.on('start drawing', function(xCoord, yCoord, color){
		socket.broadcast.emit('start drawing', xCoord, yCoord, color, socket.userID);
	});
	socket.on('stop drawing', function(){
		socket.broadcast.emit('stop drawing', socket.userID);
	});
	
	socket.on('drawing', function(xCoord, yCoord, color){
	  socket.broadcast.emit('drawing', xCoord, yCoord, color, socket.userID);	
	});
	
	socket.on('disconnect', function() {
		//TODO: remove canvas? not sure....
	})
});

//console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
