import {combineReducers} from 'redux';
import sessionReducer from './session_reducer';
import trackReducer from './track_reducer';
import errorsReducer from './errors_reducer';
import uiReducer from './ui_reducer';

export default combineReducers({
  tracks: trackReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
});
