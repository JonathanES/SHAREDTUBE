import { combineReducers } from 'redux';

import user from './user';
import video from './video';
import playlist from './playlist';
import chatroom from './chatroom';

const reducers = combineReducers({
  user, video, playlist, chatroom
});

export default reducers;