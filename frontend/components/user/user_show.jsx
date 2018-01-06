import React from 'react';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profileImage: null,
                  profileImageUrl: null,
                  backgroundImage: null,
                  backgroundImageUrl: null};
    this.updateFile = this.updateFile.bind(this);
  }

  updateFile(image) {
    return (e) => {
      const file = e.currentTarget.files[0];
      let fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({[image]: file, [`${image}Url`]: fileReader.result});
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
          style={{backgroundImage: `url(${this.props.currentUser.backgroundImageUrl})`}}>
          <section id="user-show-profile-image"
            style={{backgroundImage: `url(${this.props.currentUser.profileImageUrl})`}}>
            {this.props.isCurrentUserPage ?
              <div id="change-profile-image-box">
                <input type="file" onClick={this.updateFile("profileImage")}
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
            <input type="file" onClick={this.updateFile("backgroundImage")}
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
