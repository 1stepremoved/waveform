import React from 'react';
import MainNav from './main_nav';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';

const App = () => (
  <main>
    <MainNav></MainNav>
    <AuthRoute path="/login" component={SessionFormContainer}></AuthRoute>
    <AuthRoute path="/signup" component={SessionFormContainer}></AuthRoute>
  </main>
);

export default App;
