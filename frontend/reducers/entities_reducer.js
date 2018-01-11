import {combineReducers} from 'redux';
import trackReducer from './track_reducer';
import userReducer from './user_reducer';
import commentReducer from './comment_reducer';

export default combineReducers({
  tracks: trackReducer,
  users: userReducer,
  comment: commentReducer
});
