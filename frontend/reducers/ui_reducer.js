import { CHANGE_NAV, CHANGE_FORM } from '../actions/ui_actions';
import merge from 'lodash/merge';

const uiReducer = (state= {currentNav: "", currentForm: null}, action) => {
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
    default:
      return state;
  }
};

export default uiReducer;
