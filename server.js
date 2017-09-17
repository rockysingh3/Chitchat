'use strict';
const express = require('express');
const app = express();
const chitchat = require('./app');


// middleware
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.use('/', chitchat.router);



app.listen(app.get('port'), () => {
  console.log("The app is running on port: " + app.get('port'));
});


// video 33
