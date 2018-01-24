import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_TRACKS_AND_SHOW } from '../actions/track_actions';
import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      newState = merge({},state, {[action.user.id]: action.user});
      return newState;
    case RECEIVE_TRACKS_AND_SHOW:
      if (action.tracks.userId !== null) {
        newState[action.tracks.userId].totalTracks = action.tracks.totalTracks;
      }
      return newState;
    default:
      return state;
  }
};

export default userReducer;
