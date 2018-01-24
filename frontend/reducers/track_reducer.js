import {RECEIVE_TRACKS, RECEIVE_TRACKS_AND_SHOW, RECEIVE_TRACKS_AND_RESET,
        RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_TRACKS_FOR_SEARCH,
        RECEIVE_TRACKS_FOR_SPLASH} from '../actions/track_actions';
import merge from 'lodash/merge';

const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_TRACKS:
      newState = merge({},state, action.tracks);
      delete newState['total_tracks'];
      delete newState['user_id'];
      return newState;
    case RECEIVE_TRACKS_AND_SHOW:
      newState = merge({},state, action.tracks);
      delete newState['total_tracks'];
      delete newState['user_id'];
      return newState;
    case RECEIVE_TRACKS_FOR_SEARCH:
      newState = merge({},state, action.tracks);
      delete newState['total_tracks'];
      delete newState['user_id'];
      return newState;
    case RECEIVE_TRACKS_FOR_SPLASH:
      newState = merge({},state, action.tracks);
      delete newState['total_tracks'];
      delete newState['user_id'];
      return newState;
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
