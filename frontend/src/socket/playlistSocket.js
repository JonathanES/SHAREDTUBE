import {socket} from './config'

function createPlaylist(name, id_user,  cb){
    socket.on('CREATION', data => cb(null, data) );
    socket.emit('CREATE_PLAYLIST', name, id_user);
  }

  function createGroupPlaylist(name, id_user, id_group, cb){
    socket.on('CREATION_GROUP', data => cb(null, data) );
    socket.emit('CREATE_GROUP_PLAYLIST', name, id_user,id_group);
  }

  function insertVideoInPlaylist(video, id_playlist, cb){
    socket.on('INSERT_VIDEO', data => cb(null, data) );
    socket.emit('INSERT_VIDEO_IN_PLAYLIST', video, id_playlist);
  }

  function getGroupPlaylist(id_group, cb){
    socket.on('PLAYLIST_GROUP', data => cb(null, data) );
    socket.emit('GET_PLAYLIST_GROUP', id_group);
  }

  function getUserPlaylist(id_user, cb){
    socket.on('PLAYLIST_USER', data => cb(null, data) );
    socket.emit('GET_PLAYLIST_USER', id_user);
  }

  
  function getUserPlaylistVideo(id_user, id_video, cb){
    socket.on('PLAYLIST_USER_VIDEO', data => cb(null, data) );
    socket.emit('GET_PLAYLIST_USER_VIDEO', id_user, id_video);
  }

  function getVideosPlaylist(id_playlist, cb){
    socket.on('ALL_VIDEOS', data => cb(null, data) );
    socket.emit('GET_ALL_VIDEOS', id_playlist);
  }

  function checkVideoPlaylist(id_video, id_playlist){
    return new Promise((resolve) => {
      socket.on('CHECK_PLAYLIST', data => resolve(data));
      socket.emit('CHECK_VIDEO_PLAYLIST', id_video, id_playlist);
    });
  }

  function removeVideoOfPlaylist(id_video, id_playlist, cb){
    socket.on('REMOVE_VIDEO_FROM_PLAYLIST', data => cb(null, data) );
    socket.emit('REMOVE_VIDEO_PLAYLIST', id_video, id_playlist);
  }

  export {createPlaylist, insertVideoInPlaylist, getGroupPlaylist, getUserPlaylist, getUserPlaylistVideo, getVideosPlaylist, checkVideoPlaylist, removeVideoOfPlaylist, createGroupPlaylist};