import React from 'react';
import MainNavContainer from './main_nav/main_nav_container';
import { Route } from 'react-router-dom';
import { AuthRoute, AuthRouteExact } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';
import SplashContainer from './splash/splash_container';
import UserShowContainer from './user/user_show_container';
import TrackShowContainer from './track/track_show_container';
import UploadContainer from './upload/upload_container';

const App = () => (
  <main>
    <MainNavContainer></MainNavContainer>
    <AuthRouteExact path="/" component={SplashContainer}></AuthRouteExact>
    <Route path="/" component={SessionFormContainer}></Route>
    <Route path="/upload" component={UploadContainer}></Route>
    <Route path="/tracks/:trackId" component={TrackShowContainer}></Route>
    <Route path="/users/:userId" component={UserShowContainer}></Route>
  </main>
);

export default App;
