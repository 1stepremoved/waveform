import {RECEIVE_LIKES, RECEIVE_LIKE_ERRORS} from '../actions/like_actions';

const likeErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKES:
      return [];
    case RECEIVE_LIKE_ERRORS:
      return action.likeErrors;
    default:
      return state;
  }
};

export default likeErrorsReducer;
