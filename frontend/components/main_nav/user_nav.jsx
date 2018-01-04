import React from 'react';
import { Link } from 'react-router-dom';

class UserNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, color: "#333"};
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(e) {
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
          className="user-nav-menu-item">Profile</Link>
        <Link to={`/users/${this.props.currentUser.id}/likes`}
          className="user-nav-menu-item">Likes</Link>
        <Link to={`/users/${this.props.currentUser.id}/follows`}
          className="user-nav-menu-item">Following</Link>
        <Link to={`/users/${this.props.currentUser.id}/tracks`}
          className="user-nav-menu-item">Tracks</Link>
      </ul>
    );
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.color}} onClick={this.toggleVisibility} className="main-nav-button user-nav-container">
        <section className="user-nav-username">
          {this.props.currentUser.username}
        </section>
        {this.userNav()}
      </div>
    );
  }
}

export default UserNav;
