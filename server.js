'use strict';
const express = require('express');
const app = express();
const chitchat = require('./app/routes');
const sessions = require('./app/session');
const passport = require('passport');


// this renders the fb auth
require('./app/auth')();


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
app.listen(app.get('port'), () => {
  console.log("The app is running on port: " + app.get('port'));
});


// video 55
