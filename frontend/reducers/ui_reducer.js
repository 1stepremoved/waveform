import { CHANGE_NAV, CHANGE_FORM, TOGGLE_QUEUE } from '../actions/ui_actions';
import merge from 'lodash/merge';

const uiReducer = (state= {currentNav: "", currentForm: null, queueVisible: false}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case CHANGE_NAV:
      newState = merge({}, state);
      newState.currentNav = action.navName;
      return newState;
    case CHANGE_FORM:
      newState = merge({}, state);
      newState.currentForm = action.formName;
      return newState;
    case TOGGLE_QUEUE:
      newState = merge({},state, {queueVisible: !state.queueVisible});
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
