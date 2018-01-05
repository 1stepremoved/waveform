import React from 'react';
import MainNavContainer from './main_nav/main_nav_container';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';

const App = () => (
  <main>
    <MainNavContainer></MainNavContainer>

    <AuthRoute path="/" component={SessionFormContainer}></AuthRoute>
  </main>
);

export default App;
