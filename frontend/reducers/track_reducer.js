import {RECEIVE_TRACKS, RECEIVE_TRACKS_AND_SHOW, RECEIVE_TRACKS_AND_RESET,
        RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_TRACKS_FOR_SEARCH,
        RECEIVE_TRACKS_FOR_SPLASH, RECEIVE_LIKED_TRACKS_AND_SHOW} from '../actions/track_actions';
import {ADD_TO_QUEUE_END, ADD_TO_QUEUE_NOW, ADD_TO_QUEUE_NEXT,
        REMOVE_FROM_QUEUE, CLEAR_QUEUE} from '../actions/queue_actions';
import merge from 'lodash/merge';

const trackReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState, track;
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
    case RECEIVE_LIKED_TRACKS_AND_SHOW:
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
    case ADD_TO_QUEUE_END:
      newState = merge({}, state);
      track = newState[action.trackId];
      if (!track.audioDataURL && navigator.onLine) {
        let url = track.audioUrl;
        url = url.split("http://");
        if (url.length === 1) {
          url = url[0];
        } else {
          url = "https://" + url[1];
        }
        fetch(url, {})
        .then((res) => {
          let reader = res.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(err => console.error(err))
        .then(dataURL => {
          track.audioDataURL = dataURL;
        });
      }
      return newState;
    case ADD_TO_QUEUE_NOW:
      newState = merge({}, state);
      track = newState[action.trackId];
      if (!track.audioDataURL && navigator.onLine) {
        let url = track.audioUrl;
        url = url.split("http://");
        if (url.length === 1) {
          url = url[0];
        } else {
          url = "https://" + url[1];
        }
        fetch(url, {})
        .then((res) => {
          let reader = res.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(err => console.error(err))
        .then(dataURL => {
          track.audioDataURL = dataURL;
        });
      }
      return newState;
    case ADD_TO_QUEUE_NEXT:
      newState = merge({}, state);
      track = newState[action.trackId];
      if (!track.audioDataURL && navigator.onLine) {
        let url = track.audioUrl;
        url = url.split("http://");
        if (url.length === 1) {
          url = url[0];
        } else {
          url = "https://" + url[1];
        }
        fetch(url, {})
        .then((res) => {
          let reader = res.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(err => console.error(err))
        .then(dataURL => {
          track.audioDataURL = dataURL;
        });
      }
      return newState;
    case REMOVE_FROM_QUEUE:
      newState = merge({}, state);
      track = newState[action.trackId];
      track.audio = null;
      return newState;
    // case CLEAR_QUEUE:
    //   newState = merge({}, state);
    //   // Object.keys(newState).forEach(trackId => {
    //   //   if (trackId === "totalTracks" || trackId === "userId" || trackId == action.exception) {
    //   //     return;
    //   //   }
    //   //   newState[trackId].audio = null;
    //   // });
    //   return newState;
    default:
      return state;
  }
};

export default trackReducer;
