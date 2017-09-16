'use strict';
const express = require('express');
const app = express();

// middleware
app.set('port', process.env.PORT || 3000);
// app.use('view engin', 'ejs');

colsokhhs;ohaoaohs;

const PORT = 3000;


app.get('/', (req, res, next) => {
  res.send('<h1> hello world </h1>');
});



app.listen(app.get('port'), () => {
  console.log("The app is running on port: " + app.get('port'));
});


// video 33
