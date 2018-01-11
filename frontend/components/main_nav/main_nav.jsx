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
      <MainNavLoggedIn isRoot={this.props.isRoot} currentUser={this.props.currentUser} />
        :
      <MainNavLoggedOut isRoot={this.props.isRoot} currentUser={this.props.currentUser} changeForm={this.props.changeForm}/>;
   }

   render() {
     return this.decideNav();
   }
 }

 export default MainNav;
