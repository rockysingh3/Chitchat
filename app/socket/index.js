'use strict';
// all of the logic for socket.io
const h = require('../helpers');

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms;


  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      // check to see if room with same title exists or not
      if(!h.findRoomByName(allrooms, newRoomInput)){
        allrooms.push({
          room: newRoomInput,
          roomID: h.randomHex(),
          users: []
        });

        // Emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        // now emit it to everyone
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      }
    });
  });


  // this listens to the chatter on the client in the chatrroom.ejs
  io.of('/chatter').on('connection', socket => {
      socket.on('join', data => {
        let usersList = h.addUserToRoom(allrooms, data, socket);

        // Update the list of active users
        console.log('you here so far');
        socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
        socket.emit('updateUsersList', JSON.stringify(usersList.users));
      });

      // when a user exits delete him from the list of users
      socket.on('disconnect', () => {
        let room = h.removeUserFromRoom(allrooms, socket);
        socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
      });


      // when a new message arrives
       socket.on('newMessage', data => {
         socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
       });
  });
}
