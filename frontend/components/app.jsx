import React from 'react';
import MainNavContainer from './main_nav/main_nav_container';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';
import SplashContainer from './splash/splash_container';
import UserShowContainer from './user/user_show_container';

const App = () => (
  <main>
    <MainNavContainer></MainNavContainer>
    <Route exact path="/" component={SplashContainer}></Route>
    <Route path="/" component={SessionFormContainer}></Route>
    <Route path="/users/:userId" component={UserShowContainer}></Route>
  </main>
);

export default App;
