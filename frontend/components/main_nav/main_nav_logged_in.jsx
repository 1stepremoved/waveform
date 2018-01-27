import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import UserNavContainer from './user_nav_container';
import GeneralNavContainer from './general_nav_container';
import SearchIndexItemContainer from './search_index_item_container';

 class MainNavLoggedIn extends React.Component{
   constructor(props) {
     super(props);
     this.state = {input: ""};
     this.getSearchResults = this.getSearchResults.bind(this);
   }

   getSearchResults(e) {
     this.setState({input: e.target.value});
     if (e.target.value === "") {
       this.props.clearSearchTracks();
     } else {
       this.props.requestTracksForSearch(10, 0, e.target.value);
     }
   }

   componentWillReceiveProps(newProps) {
     if (newProps.resetSearchValue) {
       this.setState({input: ""});
       this.props.resetSearch(false);
     }
   }

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
                 <input id="main-nav-search-input" autoComplete="off"
                   type="text" placeholder="Search for artists, tracks, playlists"
                   value={this.state.input} onChange={this.getSearchResults}></input>
               </form>
               {this.state.input === "" ? null :
                 <section id="main-nav-search-index-container">
                   <div id="main-nav-search-index-query"> Search results for <span>{this.state.input}</span></div>
                   <div id="main-nav-search-index">
                     {this.props.searchTrackIds.map(trackId =>{
                       return <SearchIndexItemContainer key={trackId} trackId={trackId} />;
                     })}
                   </div>
                 </section>
               }
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
