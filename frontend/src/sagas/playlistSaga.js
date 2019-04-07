import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleListOfUserPlaylist(action){
    yield put({type: "LIST_OF_PLAYLIST", listOfPlaylist: action.listOfPlaylist});
}

function* handleGroupPlaylists(action){
    yield put({type: "PLAYLIST_GROUP", groupPlaylists: action.groupPlaylists});
}

/*function* handleVideoOfPlaylist(action){
    yield put({type: "PLAYLIST_VIDEOS", listOfPlaylist: action.videosOfPlaylist});
}*/

function *playlistSaga(){
    yield takeEvery('GET_PLAYLIST_USER', handleListOfUserPlaylist);  
    yield takeEvery('GET_PLAYLIST_GROUP', handleListOfUserPlaylist);  

   // yield takeEvery('SET_PLAYLIST_VIDEOS', handleVideoOfPlaylist);  

}

export default playlistSaga;