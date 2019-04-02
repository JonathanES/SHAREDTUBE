import { combineReducers } from 'redux';

import user from './user';
import video from './video';
import playlist from './playlist';

const reducers = combineReducers({
  user, video, playlist
});

export default reducers;