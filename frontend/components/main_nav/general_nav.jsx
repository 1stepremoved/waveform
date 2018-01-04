import React from 'react';
import { Link } from 'react-router-dom';

class GeneralNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, color: "#333"};
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.generalNav = this.generalNav.bind(this);
  }

  toggleVisibility(e) {
    this.setState({
      visible: !this.state.visible,
      color: (!this.state.visible ? "#000" : "#333")
    });
  }

  generalNav() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <ul className="general-nav-menu">
        <li onClick={() => this.props.logOut()}>Log Out</li>
      </ul>
    );
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.color}} onClick={this.toggleVisibility}
        className="main-nav-button general-nav-container">
        <section className="general-nav-icon">
          * * *
        </section>
        {this.generalNav()}
      </div>
    );
  }
}

export default GeneralNav;
