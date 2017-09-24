'use strict';

// All of the helper functions will go in this file to make the code cleaner


const db = require('../db');
const crypto = require('crypto');





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



// middlewarre that checks if a user is loged in or not
let isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/');
  }
}

// find a chatroom by given name
let findRoomByName = (allrooms, room) => {
  let findRoom = allrooms.findIndex((element, index, array) => {
    if(element.room === room){
      return true;
    }else{
      return false;
    }
  });
  return findRoom > -1 ? true : false;
}



// function that generates a unique roomID
let randomHex = () => {
  return crypto.randomBytes(24).toString('hex');
}


// finds a chatroom with a given ID, then its used in the chat route
let findRoomById = (allrooms, roomID) => {
  return allrooms.find((element, index, array) => {
    if(element.roomID === roomID){
      return true;
    }else{
      return false;
    }
  });
}


// add a user to a chatroom
let addUserToRoom = (allrooms, data, socket) => {
  let getRoom = findRoomById(allrooms, data.roomID);
  if(getRoom !== undefined){
    // get the current user id through sessions
    let userID = socket.request.session.passport.user;

    // see if the user already exits in the chatroom
    let checkUser = getRoom.users.findIndex((element, index, array) => {
      if(element.userID === userID){
        return true;
      }else{
        return false;
      }
    });

    // if exists than remove him first
    if(checkUser > -1){
      getRoom.users.splice(checkUser, 1);
    }

    // push the user into the room's users array
    getRoom.users.push({
      socketID: socket.id,
      userID,
      user: data.user,
      userPic: data.userPic
    });

    // join the room channel
    socket.join(data.roomID);

    return getRoom;
  }
}




module.exports = {
  findOne: findOne,
  createNewUser: createNewUser,
  findById: findById,
  isAuthenticated: isAuthenticated,
  findRoomByName: findRoomByName,
  randomHex: randomHex,
  findRoomById: findRoomById,
  addUserToRoom: addUserToRoom
}
