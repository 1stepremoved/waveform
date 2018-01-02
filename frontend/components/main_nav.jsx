import React from 'react';
import {NavLink} from 'react-router-dom';

 class MainNav extends React.Component{
   render() {
     return (
       <nav className="main-Nav">
         <img src="../../app/assets/images/logo.png" className="main-logo"></img>
       </nav>
     );
   }
 }

 export default MainNav;
