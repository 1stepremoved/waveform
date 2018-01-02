import React from 'react';
import {NavLink} from 'react-router-dom';

 class MainNav extends React.Component{
   render() {
     return (
       <section className="main-nav">
         <nav className="main-nav-links">
           <img src={window.staticImages.logo} className="main-logo"></img>
           <NavLink to="/stream" className="main-nav-button" activeStyle={{ backgroundColor: 'gray' }}>Home</NavLink>
           <NavLink to="/collection" className="main-nav-button" activeStyle={{ backgroundColor: 'gray' }}>Collection</NavLink>
         </nav>
       </section>
     );
   }
 }

 export default MainNav;
