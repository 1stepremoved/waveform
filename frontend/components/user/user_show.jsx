import React from 'react';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profile_image: null,
                  profile_image_url: null,
                  background_image: null,
                  background_image_url: null};
    this.updateFile = this.updateFile.bind(this);
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

  render () {
    //<i className="fas fa-camera"></i>
    return (
      <main id="user-show-container">
        <section id="user-show-background-image"
          style={{backgroundImage: `url(${this.props.currentUser.backgroundImageUrl})`,
                  backgroundPosition: 'center'}}>
          <section id="user-show-profile-image"
            style={{backgroundImage: `url(${this.props.currentUser.profileImageUrl})`,
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
            {this.props.currentUser.username}
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
      </main>
    );
  }
}

export default UserShow;
