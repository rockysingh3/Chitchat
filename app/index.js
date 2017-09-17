'use strict';
const router = require('express').Router();


// main route
router.get('/', (req, res, next) => {
  res.render('login');
});




// 404 route
router.get('*', (req, res) => {
  res.render('404');
});

module.exports = {
  router: router
}
