import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {signUp, logIn, logOut} from './actions/session_actions';

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
  window.signUp = signUp;
  window.logIn = logIn;
  window.logOut = logOut;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store} />, root);
});
