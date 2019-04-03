import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleListOfPlaylist(action){
    yield put({type: "LIST_OF_PLAYLIST", listOfPlaylist: action.listOfPlaylist});
}

/*function* handleVideoOfPlaylist(action){
    yield put({type: "PLAYLIST_VIDEOS", listOfPlaylist: action.videosOfPlaylist});
}*/

function *playlistSaga(){
    yield takeEvery('GET_PLAYLIST_USER', handleListOfPlaylist);  
   // yield takeEvery('SET_PLAYLIST_VIDEOS', handleVideoOfPlaylist);  

}

export default playlistSaga;