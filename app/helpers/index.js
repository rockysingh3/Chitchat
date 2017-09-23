'use strict';

// All of the helper functions will go in this file to make the code cleaner


const db = require('../db');





// Find a user in the db using profile.id
let findOne = profileID => {
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
              } else {
                resolve(newChatUser);
              }
            });
      });
}




// this method finds a user by findById
let findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if(error){
        reject(error);
      }else{
        resolve(user);
      }
    });
  });
}




module.exports = {
  findOne: findOne,
  createNewUser: createNewUser,
  findById: findById
}
