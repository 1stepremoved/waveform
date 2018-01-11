import {RECEIVE_TRACKS, RECEIVE_TRACKS_AND_SHOW, RECEIVE_TRACKS_AND_RESET,
        RECEIVE_TRACK, REMOVE_TRACK} from '../actions/track_actions';
import merge from 'lodash/merge';

const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TRACKS:
      return merge({},state, action.tracks);
    case RECEIVE_TRACKS_AND_SHOW:
      return merge({},state, action.tracks);
    case RECEIVE_TRACKS_AND_RESET:
      return action.tracks;
    case RECEIVE_TRACK:
      newState = merge({}, state, {[action.track.id]: action.track});
      return newState;
    case REMOVE_TRACK:
      newState = merge({}, state);
      delete newState[action.trackId];
      return newState;
    default:
      return state;
  }
};

export default trackReducer;
