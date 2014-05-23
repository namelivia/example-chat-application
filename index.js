var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bodyParser     = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	router = express.Router();

app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: 'Some secret' , name: 'sid', cookie: {secure: true}}));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

accountRoutes = require('./routes/account')(app);
app.get("/", function(req, res){
    res.render("login");
});

mongoose.connect('mongodb://localhost/chatDB', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});
 
var io = require('socket.io').listen(app.listen(60000));
console.log("Listening on port " + 60000);

var activeUsers = [];

io.sockets.on('connection', function (socket) {
	socket.on('ping', function (data){
    	if (data.username){
			if (activeUsers.indexOf(data.username) < 0){
				activeUsers.push(data.username);
			}
	    	io.sockets.emit('userlist', { list: activeUsers});
		}
	});
	socket.on('chat', function(data){
		if (data.username && data.message){
	    	io.sockets.emit('chatMessage',{username: data.username,message: data.message});
		}
	});
});

io.sockets.on('close', function (socket) {
});

io.sockets.on('error', function (socket) {
});
