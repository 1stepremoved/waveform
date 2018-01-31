import {RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS} from '../actions/session_actions';
import {RECEIVE_LIKES} from '../actions/like_actions';
import merge from 'lodash/merge';

const sessionReducer = (state = {currentUser: null}, action) =>{
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUser: action.currentUser};
    case RECEIVE_LIKES:
      return {currentUser: action.user};
    default:
      return state;
  }
};

export default sessionReducer;
