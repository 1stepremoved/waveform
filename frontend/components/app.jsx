import React from 'react';
import MainNavContainer from './main_nav/main_nav_container';
import { Route } from 'react-router-dom';
import { AuthRoute, AuthRouteExact } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';
import SplashContainer from './splash/splash_container';
import UserShowContainer from './user/user_show_container';

const App = () => (
  <main>
    <MainNavContainer></MainNavContainer>
    <AuthRouteExact path="/" component={SplashContainer}></AuthRouteExact>
    <AuthRoute path="/" component={SessionFormContainer}></AuthRoute>
    <Route path="/users/:userId" component={UserShowContainer}></Route>
  </main>
);

export default App;
