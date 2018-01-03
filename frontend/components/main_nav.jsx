import React from 'react';
import {Link, NavLink} from 'react-router-dom';

 class MainNav extends React.Component{
   render() {
     return (
       <section className="main-nav">
         <ul className="main-nav-links">
           <li className="main-nav-link">
             <Link to="/" className="main-nav-logo-button">
               <img src={window.staticImages.logo} className="main-logo"></img>
             </Link>
           </li>
           <li className="main-nav-link">
             <NavLink to="/stream" className="main-nav-button">Home</NavLink>
           </li>
           <li className="main-nav-link">
             <NavLink to="/collection" className="main-nav-button">Collection</NavLink>
           </li>
           <li className="main-nav-link">
             <NavLink to="/login" className="main-nav-login-button">Sign In</NavLink>
           </li>
           <li className="main-nav-link">
             <NavLink to="/signup" className="main-nav-signup-button">Create Account</NavLink>
           </li>
         </ul>
       </section>
     );
   }
 }

 export default MainNav;
