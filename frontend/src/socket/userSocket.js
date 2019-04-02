import {socket} from './config'

function login(email, password, cb){
    socket.on('LOGIN', data => cb(null, data) );
    socket.emit('USER_LOGIN', email, password);
  }

  function inscription(username, email, password, cb){
    socket.on('INSCRIPTION', data => cb(null, data) );
    socket.emit('USER_INSCRIPTION',username, email, password);
  }

  export {login, inscription};