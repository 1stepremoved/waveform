import React from 'react';
import {Link, NavLink} from 'react-router-dom';

 class MainNavLoggedOut extends React.Component{
   render() {
     return (
       <section className="main-nav">
         <ul className="main-nav-links">

           <div className="main-nav-left">
             <div className="main-nav-left-link">
               <Link to="/" className="main-nav-logo-button">
                 <img src={window.staticImages.logo} className="main-logo"></img>
                 <div>
                   WAVEFORM
                 </div>
               </Link>
             </div>
             <div className="main-nav-left-link">
               <NavLink to="/stream" className="main-nav-button">Home</NavLink>
             </div>
           </div>

           <div className="main-nav-right">
             <div className="main-nav-right-link">
               <NavLink to="/login" className="main-nav-login-button">Sign In</NavLink>
             </div>
             <div className="main-nav-right-link">
               <NavLink to="/signup" className="main-nav-signup-button">Create Account</NavLink>
             </div>
           </div>

         </ul>
       </section>
     );
   }
 }

 export default MainNavLoggedOut;
