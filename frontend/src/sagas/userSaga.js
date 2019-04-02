import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleLogin(action){
    yield put({type: "LOGIN", username: action.username, id_user: action.id_user, isLoggedIn: action.isLoggedIn});
}

function* handleLogOut(){
    yield put({type: "LOGOUT"});
}

function* handleRegisterDemand(){
    yield put({type: "REGISTER_DEMAND"});
}

function* handleConnexionDemand(){
    yield put({type: "CONNEXION_DEMAND"});
}

function* handlePlaylistDemand(){
    yield put({type: "PLAYLIST_DEMAND"});
}

function* handleThumbnailsDemand(){
    yield put({type: "THUMBNAILS_DEMAND"});
}

function *userSaga(){
    yield takeEvery('USER_LOGIN', handleLogin);
    yield takeEvery('USER_LOGOUT', handleLogOut);
    yield takeEvery('USER_REGISTER_DEMAND', handleRegisterDemand);
    yield takeEvery('USER_CONNEXION_DEMAND', handleConnexionDemand);
    yield takeEvery('USER_PLAYLIST_DEMAND', handlePlaylistDemand);
    yield takeEvery('USER_THUMBNAILS_DEMAND', handleThumbnailsDemand);



}

export default userSaga;