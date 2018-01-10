import {combineReducers} from 'redux';
import sessionReducer from './session_reducer';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer';
import uiReducer from './ui_reducer';
import queueReducer from './queue_reducer';

export default combineReducers({
  entities: entitiesReducer,
  queue: queueReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
});
