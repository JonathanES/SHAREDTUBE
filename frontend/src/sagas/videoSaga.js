import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleThumbnails(action){
    yield put({type: "THUMBNAILS", thumbnails: action.thumbnails, searchedValue: action.searchedValue});
}

function* handleCurrentVideo(action){
    yield put({type: "CURRENT_VIDEO", video: action.video})
}

function* handleExitVideo(){
    yield put({type: "EXIT_VIDEO"})
}

function *videoSaga(){
    yield takeEvery('VIDEO_THUMBNAILS', handleThumbnails);
    yield takeEvery('VIDEO_SELECTED', handleCurrentVideo);
    yield takeEvery('VIDEO_EXIT', handleExitVideo);
}

export default videoSaga;