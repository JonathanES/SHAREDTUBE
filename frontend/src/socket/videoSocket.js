import {socket} from './config'

function thumbnails(name, cb){
    socket.on('THUMBNAILS', data => cb(null, data) );
    socket.emit('VIDEO_THUMBNAILS', name);
}

  export {thumbnails};