import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {signUp, logIn, logOut} from './util/session_api_util';

document.addEventListener("DOMContentLoaded", ()=> {
  const root = document.getElementById("root");
  const store = configureStore();
  window.signUp = signUp;
  window.logIn = logIn;
  window.logOut = logOut;
  ReactDOM.render(<Root store={store} />, root);
});
