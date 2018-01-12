import {RECEIVE_COMMENTS, RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS, CLEAR_COMMENTS} from '../actions/comment_actions';
import merge from 'lodash/merge';

const commentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CLEAR_COMMENTS:
      return {};
    case RECEIVE_COMMENTS:
      return  merge({}, state, action.comments);
    case RECEIVE_COMMENT:
      return  merge({}, state, {[action.comment.id]: action.comment});
    default:
      return state;
  }
};

export default commentReducer;
