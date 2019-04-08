import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleListOfUserPlaylist(action){
    yield put({type: "LIST_OF_PLAYLIST", listOfPlaylist: action.listOfPlaylist});
}

function* handleGroupPlaylists(action){
    yield put({type: "PLAYLIST_GROUP", groupPlaylists: action.groupPlaylists});
}

function* handleSelectedPlaylist(action){
    yield put({type: 'SELECTED_PLAYLIST', selectedPlaylist: action.selectedPlaylist});
}

function* handleSetVideosOfPlaylist(action){
    yield put({type:'VIDEOS_OF_PLAYLIST', videosOfPlaylist: action.videosOfPlaylist});
}

function *playlistSaga(){
    yield takeEvery('GET_PLAYLIST_USER', handleListOfUserPlaylist);  
    yield takeEvery('GET_PLAYLIST_GROUP', handleGroupPlaylists);  
    yield takeEvery('SET_SELECTED_PLAYLIST', handleSelectedPlaylist);
    yield takeEvery('SET_VIDEOS_OF_PLAYLIST', handleSetVideosOfPlaylist);
}

export default playlistSaga;