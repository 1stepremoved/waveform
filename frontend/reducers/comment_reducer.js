import {RECEIVE_COMMENTS, RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS,
        REMOVE_COMMENT, CLEAR_COMMENTS} from '../actions/comment_actions';
import merge from 'lodash/merge';

const commentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CLEAR_COMMENTS:
      return {};
    case RECEIVE_COMMENTS:
      newState = merge({}, state, action.comments);
      delete newState["totalComments"];
      Object.keys(newState).forEach((commentId) => {
        newState[commentId].created_at = new Date(newState[commentId].created_at);
      });
      return  newState;
    case RECEIVE_COMMENT:
      newState = merge({}, state, {[action.comment.id]: action.comment});
      newState[action.comment.id].created_at = new Date(newState[action.comment.id].created_at);
      return newState;
    case REMOVE_COMMENT:
      newState = merge({}, state);
      delete newState[action.comment.id];
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
