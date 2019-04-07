import {socket} from './config'

function login(email, password, cb){
    socket.on('LOGIN', data => cb(null, data) );
    socket.emit('USER_LOGIN', email, password);
  }

  function inscription(username, email, password, cb){
    socket.on('INSCRIPTION', data => cb(null, data) );
    socket.emit('USER_INSCRIPTION',username, email, password);
  }

  function searchUser(id_user, username, cb){
    socket.on('SEARCH_FRIEND', data => cb(null, data) );
    socket.emit('USER_SEARCH_FRIEND', id_user, username);
  }

  function getListOfFriends(id_user, cb){
    socket.on('LIST_OF_FRIENDS', data => cb(null, data) );
    socket.emit('USER_LIST_OF_FRIENDS', id_user);
  }

  function addFriend(id_user, id_friend, cb){
    socket.on('ADD_FRIEND', data => cb(null, data) );
    socket.emit('USER_ADD_FRIEND', id_user, id_friend);
  }

  function removeFriend(id_user, id_friend, cb){
    socket.on('REMOVE_FRIEND', data => cb(null, data) );
    socket.emit('USER_REMOVE_FRIEND', id_user, id_friend);
  }

  export {login, inscription, searchUser, getListOfFriends, addFriend, removeFriend};