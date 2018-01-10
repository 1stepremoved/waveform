import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import UserNavContainer from './user_nav_container';
import GeneralNavContainer from './general_nav_container';

 class MainNavLoggedIn extends React.Component{
   render() {
     return (
       <main id="main-nav-container">
         <section className="main-nav">

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

             <div id="main-nav-search-form-container">
               <form onSubmit={(e)=>{e.preventDefault();}} id="search-form">
                 <input id="main-nav-search-input"
                   type="text" placeholder="Search for artists, tracks, playlists"></input>
               </form>
             </div>

             <div className="main-nav-right">
               <li className="main-nav-right-link">
                 <NavLink to="/upload" className="main-nav-button main-nav-upload-button">Upload</NavLink>
               </li>
               <li className="main-nav-right-link">
                 <UserNavContainer />
               </li>
               <li className="main-nav-right-link">
                 <GeneralNavContainer />
               </li>
             </div>

         </section>
       </main>
     );
   }
 }

 export default withRouter(MainNavLoggedIn);
