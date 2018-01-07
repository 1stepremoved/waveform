import {combineReducers} from 'redux';
import trackReducer from './track_reducer';

export default combineReducers({
  tracks: trackReducer
});
