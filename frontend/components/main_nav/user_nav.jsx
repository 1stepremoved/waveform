import React from 'react';
import { Link } from 'react-router-dom';

class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, color: "#333"};
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentNav !== "userNav") {
      this.setState({visible: false, color: "#333"});
    }
  }

  toggleVisibility(e) {
    if (this.state.visible) {
      this.props.changeNav("");
    } else {
      this.props.changeNav("userNav");
    }
    this.setState({
      visible: !this.state.visible,
      color: (!this.state.visible ? "#000" : "#333")
    });
  }

  userNav() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <ul className="user-nav-menu">
        <Link to={`/users/${this.props.currentUser.id}`}
          className="user-nav-menu-item"> <i className="fas fa-user"></i>Profile</Link>
        <Link to={`/users/${this.props.currentUser.id}/likes`}
          className="user-nav-menu-item"> <i className="fas fa-heart"></i>Likes</Link>
        <Link to={`/users/${this.props.currentUser.id}/follows`}
          className="user-nav-menu-item"> <i className="fas fa-users"></i>Following</Link>
        <Link to={`/users/${this.props.currentUser.id}/tracks`}
          className="user-nav-menu-item"> <i className="fas fa-list-ul"></i>Tracks</Link>
      </ul>
    );
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.color}} onClick={this.toggleVisibility}
        className="main-nav-button" id="user-nav-container">
        <section className="user-nav-username">
          <img src={this.props.currentUser.profileImageUrl} id="user-nav-profile-image"></img>
          {this.props.currentUser.username}
        </section>
        {this.userNav()}
      </div>
    );
  }
}

export default UserNav;
