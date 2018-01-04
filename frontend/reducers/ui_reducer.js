import { CHANGE_NAV } from '../actions/ui_actions';
import merge from 'lodash/merge';

const uiReducer = (state= {currentNav: ""}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case CHANGE_NAV:
      newState = merge({}, state);
      newState.currentNav = action.navName;
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
