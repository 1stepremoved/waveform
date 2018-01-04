import React from 'react';
import { Link } from 'react-router-dom';

class GeneralNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, color: "#333"};
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.generalNav = this.generalNav.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentNav !== "generalNav") {
      this.setState({visible: false, color: "#333"});
    }
  }

  toggleVisibility(e) {
    if (this.state.visible) {
      this.props.changeNav("");
    } else {
      this.props.changeNav("generalNav");
    }
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
        <li onClick={() => this.props.logOut()}>Sign out</li>
      </ul>
    );
  }

  render() {
    return (
      <div style={{backgroundColor: this.state.color}} onClick={this.toggleVisibility}
        className="main-nav-button" id="general-nav-container">
        <section className="general-nav-icon">
          <i className="fas fa-ellipsis-h"></i>
        </section>
        {this.generalNav()}
      </div>
    );
  }
}

export default GeneralNav;
