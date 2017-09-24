'use strict';
const express = require('express');
const app = express();
const chitchat = require('./app/routes');
const sessions = require('./app/session');
const passport = require('passport');


// this renders the fb auth
require('./app/auth')();


// this is the IO server instance
let ioServer = app => {
  app.locals.chatrooms = [];
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  // this middleware requests users info from session
  io.use((socket, next) => {
    require('./app/session')(socket.request, {}, next);
  });
  require('./app/socket')(io, app);
  return server;
}








// middleware
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));



// using sessions
// this has to be declared before all of the routes
app.use(sessions);
app.use(passport.initialize());
app.use(passport.session());



// all of the routes are rendered here from the app folder
app.use('/', chitchat.router);



// listener
// its listening on the io server
ioServer(app).listen(app.get('port'), () => {
  console.log("The app is running on port: " + app.get('port'));
});
