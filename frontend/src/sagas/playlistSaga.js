import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleListOfPlaylist(action){
    yield put({type: "LIST_OF_PLAYLIST", listOfPlaylist: action.listOfPlaylist});
}



function *playlistSaga(){
    yield takeEvery('GET_PLAYLIST_USER', handleListOfPlaylist);  
}

export default playlistSaga;