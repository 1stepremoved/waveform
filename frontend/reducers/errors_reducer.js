import {combineReducers} from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import trackErrorsReducer from './track_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  track: trackErrorsReducer
});
