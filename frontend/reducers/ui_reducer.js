import { CHANGE_NAV, CHANGE_MENU, CHANGE_FORM, CLEAR_SEARCH_TRACKS,
        CHANGE_WAITING_TRACKS, RESET_VISIBLE_TRACKS } from '../actions/ui_actions';
import {RECEIVE_COMMENTS, RECEIVE_COMMENT, CLEAR_COMMENTS} from '../actions/comment_actions';
import { RECEIVE_TRACKS_AND_SHOW, RECEIVE_TRACKS_FOR_SEARCH, RECEIVE_TRACKS_FOR_SPLASH} from '../actions/track_actions';
import merge from 'lodash/merge';

let initialState = {
  currentNav: "",
  currentForm: null,
  currentMenu: null,
  visibleTrackIds: [],
  searchTrackIds: [],
  splashTrackIds: [],
  totalComments: 0,
  waitingForTracks: false
};

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case CHANGE_NAV:
      newState = merge({}, state);
      newState.currentNav = action.navName;
      return newState;
    case CHANGE_MENU:
      newState = merge({}, state);
      newState.currentMenu = action.menuName;
      return newState;
    case CHANGE_FORM:
      newState = merge({}, state);
      newState.currentForm = action.formName;
      return newState;
    case RECEIVE_TRACKS_AND_SHOW:
      newState = merge({}, state);
      newState.waitingForTracks = false;
      newState.visibleTrackIds = newState.visibleTrackIds.concat(Object.keys(action.tracks));
      newState.visibleTrackIds = newState.visibleTrackIds.filter(el => el !== "totalTracks" && el !== "userId");
      return newState;
    case RESET_VISIBLE_TRACKS:
      newState =  merge({}, state);
      newState.visibleTrackIds = [];
      return newState;
    case RECEIVE_TRACKS_FOR_SEARCH:
      newState = merge({}, state);
      newState.searchTrackIds = Object.keys(action.tracks);
      newState.searchTrackIds = newState.searchTrackIds.filter(el => el !== "totalTracks" && el !== "userId");
      return newState;
    case RECEIVE_TRACKS_FOR_SPLASH:
      newState = merge({}, state);
      newState.splashTrackIds = Object.keys(action.tracks);
      newState.splashTrackIds = newState.splashTrackIds.filter(el => el !== "totalTracks" && el !== "userId");
      return newState;
    case CLEAR_SEARCH_TRACKS:
      newState = merge({}, state);
      newState.searchTrackIds = [];
      return newState;
    case RECEIVE_COMMENTS:
      newState = merge({}, state, {totalComments: action.comments.totalComments});
      return newState;
    case RECEIVE_COMMENT:
      newState = merge({}, state);
      newState.totalComments += 1;
      return newState;
    case CLEAR_COMMENTS:
      newState = merge({}, state);
      newState.totalComments = 0;
      return newState;
    case CHANGE_WAITING_TRACKS:
      newState = merge({}, state, {waitingForTracks: action.value});
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
