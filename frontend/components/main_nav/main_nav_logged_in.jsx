import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import UserNavContainer from './user_nav_container';
import GeneralNavContainer from './general_nav_container';

 class MainNavLoggedIn extends React.Component{
   render() {
     return (
       <section className="main-nav">
         <ul className="main-nav-links">

           <div className="main-nav-left">
             <li className="main-nav-left-link">
               <Link to="/stream" className="main-nav-logo-button">
                 <img src={window.staticImages.logo} className="main-logo"></img>
               </Link>
             </li>
             <li className="main-nav-left-link">
               <NavLink to="/stream" className="main-nav-button">Home</NavLink>
             </li>
             <li className="main-nav-left-link">
               <NavLink to="/collection" className="main-nav-button">Collection</NavLink>
             </li>
           </div>

           <div className="main-nav-right">
             <li className="main-nav-right-link">
               <NavLink to="/upload" className="main-nav-button">Upload</NavLink>
             </li>
             <li className="main-nav-right-link">
               <UserNavContainer />
             </li>
             <li className="main-nav-right-link">
               <GeneralNavContainer />
             </li>
           </div>

         </ul>
       </section>
     );
   }
 }

 export default withRouter(MainNavLoggedIn);
