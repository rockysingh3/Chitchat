'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

// check if the db isn't connected
Mongoose.connection.on('error', error => {
  console.log("MongoDB Error: ", error);
});

// Create a Schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

// creates a model of the schema
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose: Mongoose,
  userModel: userModel
}
