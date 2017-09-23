'use strict';
const router = require('express').Router();
const passport = require('passport');




// main route
router.get('/', (req, res, next) => {
  res.render('login');
});


// rooms route
router.get('/rooms', (req, res, next) => {
  res.render('rooms', {
    user: req.user
  });
});

// chatroom route
router.get('/chatroom', (req, res, next) => {
  res.render('chatroom');
});


// route for facebook Oauth
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/rooms',
    failureRedirect: '/'
  })
);


// 404 erro route
router.get('*', (req, res, next) => {
  res.render('404');
});

module.exports = {
  router: router
}
