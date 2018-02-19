import React from 'react';
import MainNavContainer from './main_nav/main_nav_container';
import { Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute, AuthRouteExact } from '../util/auth_route';
import SessionFormContainer from './session_form/session_form_container';
import SplashContainer from './splash/splash_container';
import UserShowContainer from './user/user_show_container';
import TrackShowContainer from './track/track_show_container';
import UploadContainer from './upload/upload_container';
import PlayerContainer from './player/player_container';
import CollectionContainer from './collection/collection_container';
import StreamContainer from './stream/stream_container';

const App = () => (
  <main>
    <MainNavContainer></MainNavContainer>
    <AuthRouteExact path="/" component={SplashContainer}></AuthRouteExact>
    <AuthRouteExact path="/" component={SessionFormContainer}></AuthRouteExact>
    <ProtectedRoute path="/collection" component={CollectionContainer}></ProtectedRoute>
    <ProtectedRoute path="/stream" component={StreamContainer}></ProtectedRoute>
    <ProtectedRoute path="/upload" component={UploadContainer}></ProtectedRoute>
    <Route path="/tracks/:trackId" component={TrackShowContainer}></Route>
    <Route path="/users/:userId" component={UserShowContainer}></Route>
    <PlayerContainer></PlayerContainer>
  </main>
);

//<AuthRouteExact path="/" component={SplashContainer}></AuthRouteExact>

export default App;
