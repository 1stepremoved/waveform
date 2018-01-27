import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {changeNav} from './actions/ui_actions';
import {requestTracks, requestTrack, deleteTrack} from './actions/track_actions';

document.addEventListener("DOMContentLoaded", ()=> {
  document.addEventListener("click", (e)=> {
    let target = e.target;
    while (target !== null) {
      // debugger
      if (target.className === "user-nav-menu" || target.id === "general-nav-container"){
        return;
      }
      // debugger
      target = target.parentElement;
    }
    debugger
    changeNav("");
  });
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    let preloadedState = {session: {currentUser: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
});
