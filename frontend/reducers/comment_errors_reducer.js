import {RECEIVE_COMMENTS, RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS, CLEAR_COMMENTS} from '../actions/comment_actions';

const commentErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return [];
    case RECEIVE_COMMENT:
      return [];
    case CLEAR_COMMENTS:
      return [];
    case RECEIVE_COMMENT_ERRORS:
      return action.commentErrors;
    default:
      return state;
  }
};

export default commentErrorsReducer;
