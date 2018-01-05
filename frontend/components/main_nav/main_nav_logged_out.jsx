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
               <div onClick={() => this.openForm("login")} className="main-nav-login-button">Sign In</div>
             </div>
             <div className="main-nav-right-link">
               <div onClick={() => this.openForm("signup")} className="main-nav-signup-button">Create Account</div>
             </div>
           </div>

         </ul>
       </section>
     );
   }
 }

 export default MainNavLoggedOut;
