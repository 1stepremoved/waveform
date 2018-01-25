import {RECEIVE_TRACKS, RECEIVE_TRACK, REMOVE_TRACK,
        RECEIVE_TRACK_ERRORS, CLEAR_TRACK_ERRORS} from '../actions/track_actions';

const trackErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRACKS:
      return [];
    case RECEIVE_TRACK:
      return [];
    case REMOVE_TRACK:
      return [];
    case RECEIVE_TRACK_ERRORS:
      return action.trackErrors;
    case CLEAR_TRACK_ERRORS:
      return [];
    default:
      return state;
  }
};

export default trackErrorsReducer;
