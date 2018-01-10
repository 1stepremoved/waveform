import React from 'react';
import {Link, NavLink} from 'react-router-dom';

 class MainNavLoggedOut extends React.Component{

   constructor(props) {
     super(props);
     this.openForm = this.openForm.bind(this);
   }

   openForm(formName) {
     this.props.changeForm(formName);
   }

   render() {
     return (
       <main id="main-nav-container">
         <section className="main-nav">

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

             <div id="main-nav-search-form-container">
               <form onSubmit={(e)=>{e.preventDefault();}} id="search-form">
                 <input id="main-nav-search-input"
                   type="text" placeholder="Search for artists, tracks, playlists"></input>
               </form>
             </div>

             <div className="main-nav-right">
               <div className="main-nav-right-link">
                 <div onClick={() => this.openForm("login")} className="main-nav-login-button">Sign In</div>
               </div>
               <div className="main-nav-right-link">
                 <div onClick={() => this.openForm("signup")} className="main-nav-signup-button">Create Account</div>
               </div>
             </div>

         </section>
       </main>
     );
   }
 }

 export default MainNavLoggedOut;
