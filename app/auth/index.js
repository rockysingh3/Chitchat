'use strict';
const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;




module.exports = () => {

    // this method serializes the user with the _id in mongodb
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      h.findById(id)
        .then(user => done(null, user))
        .catch(error => console.log('Error finding the user'));
    });




        // pass this method to into FacebookStrategy
        let authProcessor = (accessToken, refreshToken, profile, done) => {

          // If the user found, return the user data using done()
          // If the user is not found, create one in the db and return
          h.findOne(profile.id)
            .then(result => {
              if(result){
                done(null, result);
              }else{
              // user is loggin for the first time
                h.createNewUser(profile)
                  .then(newChatUser => done(null, newChatUser))
                  .catch(error => console.log('Error when creating new user'));
              }
            }); // end of findOne

        } // end of authProcessor

  passport.use(new FacebookStrategy(config.fb, authProcessor));
} // end of exports
