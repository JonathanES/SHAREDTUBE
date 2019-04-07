import { call, put, takeEvery, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';

function* handleListOfGroups(action){
    yield put({type: "LIST_OF_GROUPS", listOfGroups: action.listOfGroups});
}

function* handleSelectedGroup(action){
    yield put({type: 'SELECTED_GROUP', selectedGroup: action.selectedGroup});
}


function *chatroomSaga(){
    yield takeEvery('GET_GROUPS_USER', handleListOfGroups);  
    yield takeEvery('USER_SELECTED_GROUP', handleSelectedGroup);
}

export default chatroomSaga;