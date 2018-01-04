import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: "", password2: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.loggedIn) {
  //     this.props.history.push('/');
  //   }
  // }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.props.formType === "signup") {
      user.email = this.state.email;
    }
    this.props.submitAction(user)
      .then(() => this.props.history.push("/stream"));
  }

  handleChange(type) {
    return (e) => {
      this.setState({[type]: e.target.value});
    };
  }

  closeForm(e) {
    if (e.target.className === "session-form-screen") {
      this.props.history.push("/");
    }
  }

  render () {
    let submitText, usernameText, passwordText;
    if (this.props.formType === "login") {
      submitText = "Sign In";
      usernameText = "Enter your username or email address";
      passwordText = "Enter your password";
    } else {
      submitText = "Create Account";
      usernameText = "Choose a username";
      passwordText = "Choose a password";
    }

    return (
      <main className="session-form-screen" onClick={this.closeForm}>
        <ReactCSSTransitionGroup
          transitionName="session-form-transform"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {
            <form key={1} onSubmit={this.handleSubmit} className="session-form" >
              <label>
                <input type="text" placeholder={usernameText}
                  onChange={this.handleChange("username")} value={this.state.username}></input>
              </label>

              { this.props.formType ==="signup"
                  ?
                <label>
                  <input type="text" placeholder="Enter your email address"
                    onChange={this.handleChange("email")} value={this.state.email}></input>
                </label>
                  :
                null
              }

              <label>
                <input type="password" placeholder={passwordText}
                  onChange={this.handleChange("password")} value={this.state.password}></input>
              </label>

              { this.props.formType === "signup"
                  ?
                <label>
                  <input type="password" placeholder="Retype your password"
                    onChange={this.handleChange("password2")} value={this.state.password2}></input>
                </label>
                  :
                null
              }

              <label className="session-errors">
                  {this.props.errors.map((error) => {
                    return error;
                  })}
              </label>

              <input type="submit" value={submitText}></input>
            </form>
          }
        </ReactCSSTransitionGroup>
      </main>
    );
  }
}

export default SessionForm;
