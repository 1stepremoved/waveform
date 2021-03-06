import { ADD_TO_QUEUE_END, ADD_TO_QUEUE_NOW, ADD_TO_QUEUE_NEXT,
         REMOVE_FROM_QUEUE, CLEAR_QUEUE, NEXT_SONG, LAST_SONG,
         SHUFFLE, REPEAT, PAUSE, SET_POSITION, START_TRACK, MOVE_CURRENT_TRACK,
         MOVE_TRACK, MOVE_TO_TRACK, RESET_RESTART,
         COLLAPSE_QUEUE_ITEM, COLLAPSE_QUEUE_ITEM_POSITION} from '../actions/queue_actions';
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
  restart: false,
  collapsedQueueItem: -1,
  collapsedQueueItemPosition: null
};

const queueReducer = (state=initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  let left, right, trackIdPlace, temp;
  switch (action.type) {
    case ADD_TO_QUEUE_END:
      newState.order.push(newState.order.length);
      newState.trackIds.push(action.trackId);
      if (newState.trackIds.length === 1) {
        newState.currentTrack += 1;
        newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
        newState.startTrack = true;
        newState.paused = false;
      }
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
      newState.currentTrack = action.place;
      newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
      newState.paused = false;
      newState.startTrack = true;
      return newState;
    case ADD_TO_QUEUE_NEXT:
      newState.trackIds = newState.trackIds.slice(0,state.currentTrack + 1)
        .concat([action.trackId]).concat(newState.trackIds.slice(state.currentTrack + 1));
      newState.order.push(newState.order.length);
      if (newState.trackIds.length === 1) {
        newState.currentTrack += 1;
        newState.currentId = newState.trackIds[newState.order[newState.currentTrack]];
        newState.startTrack = true;
        newState.paused = false;
      }
      return newState;
    case CLEAR_QUEUE:
      // newState = merge({}, state, {trackIds: [], currentTrack: 0,order: []});
      newState.trackIds = [];
      newState.currentTrack = 0;
      newState.order = [];
      newState.order.push(newState.order.length);
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
      left = state.order.slice(0,state.currentTrack);
      right = state.order.slice(state.currentTrack + 1);
      if (action.dir === "back") {
        right.unshift(left.pop());
      } else {
        left.push(right.shift());
      }
      newState.order = left.concat(state.currentTrack).concat(right);
      return newState;
    case MOVE_TRACK:
      if (action.backwards) {
        if (newState.collapsedQueueItem > 0) {
          temp = newState.order[newState.collapsedQueueItem - 1];
          newState.order[newState.collapsedQueueItem - 1] = newState.order[newState.collapsedQueueItem];
          newState.order[newState.collapsedQueueItem] = temp;
          if (newState.currentTrack === newState.collapsedQueueItem) {
            newState.currentTrack -= 1;
          } else if (newState.collapsedQueueItem - 1  === newState.currentTrack) {
            newState.currentTrack += 1;
          }
          newState.collapsedQueueItem -= 1;
        }
      } else {
        if (newState.collapsedQueueItem < newState.order.length - 1) {
          temp = newState.order[newState.collapsedQueueItem + 1];
          newState.order[newState.collapsedQueueItem + 1] = newState.order[newState.collapsedQueueItem];
          newState.order[newState.collapsedQueueItem] = temp;
          if (newState.currentTrack === newState.collapsedQueueItem) {
            newState.currentTrack += 1;
          } else if (newState.collapsedQueueItem + 1 === newState.currentTrack) {
            newState.currentTrack -= 1;
          }
          newState.collapsedQueueItem += 1;
        }
      }
      return newState;
    case RESET_RESTART:
      newState.restart = false;
      return newState;
    case REMOVE_FROM_QUEUE:
      trackIdPlace = state.order[action.place];
      left = state.trackIds.slice(0, trackIdPlace);
      right = state.trackIds.slice(trackIdPlace + 1);
      newState.trackIds = left.concat(right);
      left = state.order.slice(0,action.place);
      right = state.order.slice(action.place + 1);
      newState.order = left.concat(right);
      newState.order = newState.order.map(el => {
        if (el >= trackIdPlace) {
          return el - 1;
        } else {
          return el;
        }
      });
      if (newState.currentTrack >= action.place) {
        newState.currentTrack -= 1;
      }
      return newState;
    case COLLAPSE_QUEUE_ITEM:
      newState.collapsedQueueItem = action.place;
      return newState;
    case COLLAPSE_QUEUE_ITEM_POSITION:
      newState.collapsedQueueItemPosition = action.position;
      return newState;
    default:
      return state;
  }
};

export default queueReducer;
