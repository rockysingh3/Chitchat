'use strict';
const router = require('express').Router();
const passport = require('passport');
const h = require('../helpers');




// main route
router.get('/', (req, res, next) => {
  res.render('login');
});


// rooms route
router.get('/rooms', h.isAuthenticated, (req, res, next) => {
  res.render('rooms', {
    user: req.user
  });
});

// chatroom route
router.get('/chatroom', h.isAuthenticated, (req, res, next) => {
  res.render('chatroom', { user: req.user });
});


// routes for facebook Oauth
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/rooms',
    failureRedirect: '/'
  })
);


// logout route
router.get('/logout', (req, res, next) => {
  // this is provided by passport
  req.logout();
  res.redirect('/');
});


// routes for twitter Oauth
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
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
