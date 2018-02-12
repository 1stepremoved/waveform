import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import UserNavContainer from './user_nav_container';
import GeneralNavContainer from './general_nav_container';
import SearchIndexItemContainer from './search_index_item_container';

 class MainNav extends React.Component{
   constructor(props) {
     super(props);
     this.state = {input: ""};
     this.openForm = this.openForm.bind(this);
     this.getSearchResults = this.getSearchResults.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   openForm(formName) {
     const that = this;
     this.props.changeForm("opening-session-form");
     setTimeout(() => {
       that.props.changeForm(formName);
     }, 0);
   }

   getSearchResults(e) {
     this.setState({input: e.target.value});
     if (e.target.value === "") {
       this.props.clearSearchTracks();
     } else {
       this.props.requestTracksForSearch(10, 0, e.target.value);
     }
   }

   handleSubmit(e) {
     e.preventDefault();
   }

   componentWillReceiveProps(newProps) {
     if (newProps.resetSearchValue) {
       this.setState({input: ""});
       this.props.resetSearch(false);
     }
   }

   render() {
     return (
       <main id="main-nav-container" className={`collapsable ${this.props.isRoot ? "collapsed-down" : "uncollapsed-down"}`}
         style={{transformOrigin: 'top'}}>
         <section className="main-nav">

            {this.props.currentUser ?

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
              :
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

             }

             <div id="main-nav-search-form-container">
               <form onSubmit={this.handleSubmit} id="search-form">
                 <input id="main-nav-search-input" autoComplete="off"
                   type="text" placeholder="Search for tracks"
                   value={this.state.input} onChange={this.getSearchResults}></input>
               </form>
               {this.state.input === "" ? null :
                 <section id="main-nav-search-index-container">
                   <div id="main-nav-search-index-query"> Search results for <span>{this.state.input}</span></div>
                   <div id="main-nav-search-index">
                     {this.props.searchTrackIds.map(trackId =>{
                       return <SearchIndexItemContainer key={trackId}  trackId={trackId} />;
                     })}
                   </div>
                 </section>
               }
             </div>

            {this.props.currentUser ?

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
              :
             <div className="main-nav-right">
               <div className="main-nav-right-link">
                 <div onClick={() => this.openForm("login")} className="main-nav-login-button">Sign In</div>
               </div>
               <div className="main-nav-right-link">
                 <div onClick={() => this.openForm("signup")} className="main-nav-signup-button">Create Account</div>
               </div>
             </div>

            }

         </section>
       </main>
     );
   }
 }

 export default MainNav;
