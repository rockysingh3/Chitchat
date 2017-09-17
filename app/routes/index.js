'use strict';
const router = require('express').Router();


// main route
router.get('/', (req, res, next) => {
  res.render('login');
});


// rooms route
router.get('/rooms', (req, res, next) => {
  res.render('rooms');
});

// chatroom route
router.get('/chatroom', (req, res, next) => {
  res.render('chatroom');
});




// 404 route
router.get('*', (req, res) => {
  res.render('404');
});

module.exports = {
  router: router
}
