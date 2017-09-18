'use strict';
const express = require('express');
const app = express();
const chitchat = require('./app/routes');


// middleware
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));



// all of the routes are rendered here from the app folder
app.use('/', chitchat.router);



// listener
app.listen(app.get('port'), () => {
  console.log("The app is running on port: " + app.get('port'));
});


// video 40
