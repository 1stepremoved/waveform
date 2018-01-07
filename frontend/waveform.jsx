import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {requestTracks, requestTrack, deleteTrack} from './actions/track_actions';

document.addEventListener("DOMContentLoaded", ()=> {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    let preloadedState = {session: {currentUser: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.requestTracks = requestTracks;
  window.requestTrack = requestTrack;
  window.deleteTrack = deleteTrack;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store} />, root);
});
