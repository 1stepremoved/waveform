import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import TrackIndexItemContainer from '../track/track_index_item_container';


class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.loadedUser = this.loadedUser.bind(this);
    this.state = {profile_image: null,
                  profile_image_url: this.loadedUser("profileImageUrl"),
                  background_image: null,
                  background_image_url: this.loadedUser("backgroundImageUrl"),
                  trackRequestOffset: 0};
    this.updateFile = this.updateFile.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (!this.pageUser){
      this.props.requestUser(this.props.pageUserId).
        then(() => {
          this.setState({profile_image_url: this.props.pageUser["profileImageUrl"],
                         background_image_url: this.props.pageUser["backgroundImageUrl"]});
        });
    }
    this.props.requestUsersTracks(this.props.pageUserId, 12);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetVisibleTracks();
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.pageUserId !== newProps.pageUserId) {
      this.props.resetVisibleTracks();
      this.props.requestUser(newProps.pageUserId);
      this.props.requestUsersTracks(newProps.pageUserId, 12);
    }
  }

  updateFile(image) {
    return (e) => {
      const file = e.currentTarget.files[0];
      let fileReader = new FileReader();
      const that = this;
      fileReader.onloadend = () => {
        this.setState({[image]: file, [`${image}_url`]: fileReader.result});
        let formData = new FormData();
        formData.append(`user[${image}]`, file);
        that.props.updateUser(formData, that.props.currentUser.id);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    };
  }

  loadedUser(key) {
    return this.props.pageUser ? this.props.pageUser[key] : null;
  }

  handleScroll(e) {
    if (window.innerHeight + window.pageYOffset > this.user_show_page.scrollHeight) {
      if (!this.props.waitingForTracks
        && this.props.visibleTrackIds.length < this.loadedUser("totalTracks")){
          this.props.requestUsersTracks(this.props.pageUserId, 12, this.state.trackRequestOffset + 12);
          this.setState({trackRequestOffset: this.state.trackRequestOffset + 12});
          this.props.changeWaitingTracks(true);
      }
    }
  }

  render () {
    //<i className="fas fa-camera"></i>
    return (
      <main ref={(user_show) => {this.user_show_page = user_show;}}id="user-show-container" style={{overflowY: "hidden"}}>
        <section id="user-show-background-image"
          style={{backgroundImage: `url(${this.state.background_image_url})`,
                  backgroundPosition: 'center'}}>
          <section id="user-show-profile-image"
            style={{backgroundImage: `url(${this.state.profile_image_url})`,
                    backgroundPosition: 'center'}}>

            {!this.props.isCurrentUserPage ? null :
              <div id="change-profile-image-box">
                <label id="change-profile-image-label" htmlFor="change-profile-image">
                  <i className="fas fa-camera"></i> Update image
                </label>
                <input type="file" onChange={this.updateFile("profile_image")}
                   id="change-profile-image" ></input>
              </div>
            }

          </section>
          <section id="user-show-username">
            {this.loadedUser("username")}
          </section>

          {!this.props.isCurrentUserPage ? null :
          <div id="change-background-image-box">
            <label id="change-background-image-label" htmlFor="change-background-image">
              <i className="fas fa-camera"></i> Upload header image
            </label>
            <input type="file" onChange={this.updateFile("background_image")}
               id="change-background-image" ></input>
          </div>
          }

        </section>

        <section id="user-show-panel">
          <div id="user-show-panel-selectors">
            <NavLink exact to={`/users/${this.props.pageUserId}`}
              activeClassName="selected">All</NavLink>
            <NavLink exact to={`/users/${this.props.pageUserId}/tracks`}
              activeClassName="selected">Tracks</NavLink>
          </div>
          <div id="user-show-panel-buttons">
          </div>
        </section>
        <section id="user-tracks-and-info">

          {this.props.visibleTrackIds.length === 0 ?
            <div id="user-show-default-message">
              <p>No tracks have been uploaded yet</p>
              {this.props.isCurrentUserPage ? <Link to="/upload">Start sharing</Link> : null}
            </div>

             :

             <div id="user-tracks">
               {this.props.visibleTrackIds.map((trackId, idx) => {
                 return <TrackIndexItemContainer  key={idx} trackId={trackId} />;
               })}
             </div>
          }
          {this.loadedUser("totalTracks") && this.props.visibleTrackIds.length < this.loadedUser("totalTracks") ?
            <div className="user-show-loader"></div> : null
          }
        </section>
      </main>
    );
  }
}

export default UserShow;
