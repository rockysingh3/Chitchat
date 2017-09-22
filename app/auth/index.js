'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../db');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Find the user using the _id
  });








  // pass this method to into FacebookStrategy
  let authProcessor = (accessToken, refreshToken, profile, done) => {


// Find a user in the db using profile.id
    let findOne = profileID = {
      return db.userModel.findOne({
        'profileId': profileID
      });
    }


// this method saves a new user in the db
    let createNewUser = profile => {
      return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
          profileId: profile.id,
          fullName: profile.displayName,
          profilePic: profile.photos[0].value || ''
        });

        newChatUser.save(error => {
          if(error) {
            reject(error);
          }else{
            resolve(newChatUser);
          }
        });
      });
    }

    // If the user found, return the user data using done()
    // If the user is not found, create one in the db and return
    findOne(profile.id)
    .then(result => {
      if(result){
        done(null, result);
      }else{
        // user is loggin for the first time
        createNewUser(profile)
        .then(newChatUser => done(null, newChatUser))
        .catch(error => console.log('Error when creating new user'));

      }
    });
  }
  passport.use(new FacebookStrategy(config.fb, authProcessor));
}
