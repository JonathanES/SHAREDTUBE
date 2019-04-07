import {socket} from './config'

function createGroup(name, id_user, cb){
    socket.on('CREATE_GROUP', data => cb(null, data) );
    socket.emit('USER_CREATE_GROUP', name, id_user);
  }

  function getUserGroups(id_user, cb){
    socket.on('GET_GROUP', data => cb(null, data) );
    socket.emit('USER_GET_GROUP', id_user);
  }

  function addUserGroup(id_user, id_group, cb){
    socket.on('ADD_FRIEND_GROUP', data => cb(null, data) );
    socket.emit('USER_ADD_FRIEND_GROUP', id_user, id_group);
  }

  function sendMessage(id_group, username, message, cb){
    socket.on('SEND_MESSAGE', data => cb(null, data) );
    socket.emit('USER_SEND_MESSAGE', id_group, username, message);
  }


  function getMessage(id_group, cb){
    socket.on('GET_MESSAGE', data => cb(null, data) );
    socket.emit('USER_GET_MESSAGE', id_group);
  }




  export {createGroup, getUserGroups, addUserGroup, sendMessage, getMessage, socket};