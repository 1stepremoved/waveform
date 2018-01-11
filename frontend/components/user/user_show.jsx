import React from 'react';
import { NavLink } from 'react-router-dom';
import TrackIndexItemContainer from '../track/track_index_item_container';


class UserShow extends React.Component {
  constructor(props) {
    super(props);

    this.loadedUser = this.loadedUser.bind(this);
    this.state = {profile_image: null,
                  profile_image_url: this.loadedUser("profileImageUrl"),
                  background_image: null,
                  background_image_url: this.loadedUser("backgroundImageUrl")};
    this.updateFile = this.updateFile.bind(this);
  }

  componentDidMount() {
    if (!this.pageUser){
      this.props.requestUser(this.props.pageUserId).
        then(() => {
          this.setState({profile_image_url: this.props.pageUser["profileImageUrl"],
                         background_image_url: this.props.pageUser["backgroundImageUrl"]});
        });
    }
    this.props.requestUsersTracks(this.props.pageUserId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.pageUserId !== newProps.pageUserId) {
      this.props.requestUser(newProps.pageUserId);
      this.props.requestUsersTracks(newProps.pageUserId);
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

  render () {
    //<i className="fas fa-camera"></i>
    return (
      <main id="user-show-container">
        <section id="user-show-background-image"
          style={{backgroundImage: `url(${this.state.background_image_url})`,
                  backgroundPosition: 'center'}}>
          <section id="user-show-profile-image"
            style={{backgroundImage: `url(${this.state.profile_image_url})`,
                    backgroundPosition: 'center'}}>
            {this.props.isCurrentUserPage ?
              <div id="change-profile-image-box">
                <label id="change-profile-image-label" htmlFor="change-profile-image">
                  <i className="fas fa-camera"></i> Update image
                </label>
                <input type="file" onChange={this.updateFile("profile_image")}
                   id="change-profile-image" ></input>
              </div>
              : null
            }
          </section>
          <section id="user-show-username">
            {this.loadedUser("username")}
          </section>
          {this.props.isCurrentUserPage ?
          <div id="change-background-image-box">
            <label id="change-background-image-label" htmlFor="change-background-image">
              <i className="fas fa-camera"></i> Upload header image
            </label>
            <input type="file" onChange={this.updateFile("background_image")}
               id="change-background-image" ></input>
          </div>
            : null
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
          <div id="user-tracks">
            {this.props.visibleTrackIds.map((trackId, idx) => {
              return <TrackIndexItemContainer  key={idx} trackId={trackId} />;
            })}
          </div>
        </section>
      </main>
    );
  }
}

export default UserShow;
