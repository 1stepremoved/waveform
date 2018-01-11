import { CHANGE_NAV, CHANGE_FORM, TOGGLE_QUEUE } from '../actions/ui_actions';
import {RECEIVE_COMMENTS, RECEIVE_COMMENT, CLEAR_COMMENTS} from '../actions/comment_actions';
import { RECEIVE_TRACKS_AND_SHOW } from '../actions/track_actions';
import merge from 'lodash/merge';

let initialState = {
  currentNav: "",
  currentForm: null,
  queueVisible: false,
  visibleTrackIds: [],
  totalComments: 0
};

const uiReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case CHANGE_NAV:
      newState = merge({}, state);
      newState.currentNav = action.navName;
      return newState;
    case CHANGE_FORM:
      newState = merge({}, state);
      newState.currentForm = action.formName;
      return newState;
    case TOGGLE_QUEUE:
      newState = merge({},state, {queueVisible: !state.queueVisible});
      return newState;
    case RECEIVE_TRACKS_AND_SHOW:
      newState = merge({}, state);
      newState.visibleTrackIds = Object.keys(action.tracks);
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
    default:
      return state;
  }
};

export default uiReducer;
