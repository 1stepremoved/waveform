import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import MainNavLoggedIn from './main_nav_logged_in';
import MainNavLoggedOut from './main_nav_logged_out';

 class MainNav extends React.Component{
   constructor(props) {
     super(props);
     this.decideNav = this.decideNav.bind(this);
   }

   decideNav() {
     return (this.props.currentUser) ?
      <MainNavLoggedIn isRoot={this.props.isRoot} currentUser={this.props.currentUser}
        requestTracksForSearch={this.props.requestTracksForSearch}
        searchTrackIds={this.props.searchTrackIds} clearSearchTracks={this.props.clearSearchTracks}
        resetSearch={this.props.resetSearch} resetSearchValue={this.props.resetSearchValue}/>
        :
      <MainNavLoggedOut isRoot={this.props.isRoot} currentUser={this.props.currentUser}
        requestTracksForSearch={this.props.requestTracksForSearch} changeForm={this.props.changeForm}
        searchTrackIds={this.props.searchTrackIds} clearSearchTracks={this.props.learSearchTracks}
        resetSearch={this.props.resetSearch} resetSearchValue={this.props.resetSearchValue}/>;
   }

   render() {
     return this.decideNav();
   }
 }

 export default MainNav;
