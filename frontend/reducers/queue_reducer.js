import { ADD_TO_QUEUE_END, ADD_TO_QUEUE_NOW, ADD_TO_QUEUE_NEXT,
         REMOVE_FROM_QUEUE, CLEAR_QUEUE, NEXT_SONG, LAST_SONG,
         SHUFFLE, REPEAT, PAUSE, SET_POSITION, START_TRACK, MOVE_CURRENT_TRACK,
         MOVE_TO_TRACK, RESET_RESTART} from '../actions/queue_actions';
import merge from 'lodash/merge';

let initialState = {
  trackIds: [],
  paused: true,
  currentId: null,
  currentTrack: -1,
  startTrack: false,
  position: 0,
  order: [],
  shuffle: false,
  repeat: false,
  restart: false
};

const queueReducer = (state=initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case ADD_TO_QUEUE_END:
      newState.order.push(newState.order.length);
      newState.trackIds.push(action.trackId);
      return newState;
    case ADD_TO_QUEUE_NOW:
      newState.trackIds.push(action.trackId);
      newState.order = newState.order.slice(0,state.currentTrack + 1).concat(newState.trackIds.length - 1).concat(newState.order.slice(state.currentTrack + 1));
      newState.currentTrack += 1;
      newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
      newState.paused = false;
      newState.startTrack = true;
      return newState;
    case MOVE_TO_TRACK:
      newState.currentId = action.trackId;
      newState.currentTrack = newState.trackIds.indexOf(action.trackId);
      newState.paused = false;
      newState.startTrack = true;
      return newState;
    case ADD_TO_QUEUE_NEXT:
      newState.trackIds = newState.trackIds.slice(0,state.currentTrack + 1)
        .concat([action.trackId]).concat(newState.trackIds.slice(state.currentTrack + 1));
      return newState;
    case CLEAR_QUEUE:
      // newState = merge({}, state, {trackIds: [], currentTrack: 0,order: []});
      newState.trackIds = [];
      newState.currentTrack = 0;
      newState.order = [];
      newState.currentId = state.currentId;
      newState.trackIds.push(state.currentId);
      return newState;
    case NEXT_SONG:
      newState.position = 0;
      newState.startTrack = true;
      if (state.currentTrack === state.trackIds.length - 1) {
        if (state.repeat) {
          newState.currentTrack = 0;
          newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
          newState.restart = true;
        } else {
          newState.paused = true;
          newState.startTrack = false;
          newState.position = 0;
          newState.restart = true;
        }
      } else {
        newState.currentTrack += 1;
        newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
      }
      return newState;
    case LAST_SONG:
      newState.position = 0;
      newState.startTrack = true;
      if (state.currentTrack === 0) {
        if (state.repeat) {
          newState.currentTrack = state.trackIds.length - 1;
          newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
          newState.restart = true;
        } else {
          newState.paused = true;
          newState.startTrack = false;
          newState.position = 0;
          newState.restart = true;
        }
      } else {
        newState.currentTrack -= 1;
        newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
      }
      return newState;
    case REPEAT:
      newState.repeat = !state.repeat;
      return newState;
    case PAUSE:
      newState.paused = !state.paused;
      return newState;
    case SET_POSITION:
      newState.position = action.position;
      return newState;
    case START_TRACK:
      newState.startTrack = action.value;
      return newState;
    case MOVE_CURRENT_TRACK:
      let left = state.order.slice(0,state.currentTrack);
      let right = state.order.slice(state.currentTrack + 1);
      if (action.dir === "back") {
        right.unshift(left.pop());
      } else {
        left.push(right.shift());
      }
      newState.order = left.concat(state.currentTrack).concat(right);
      return newState;
    case RESET_RESTART:
      newState.restart = false;
      return newState;
    default:
      return state;
  }
};

export default queueReducer;
