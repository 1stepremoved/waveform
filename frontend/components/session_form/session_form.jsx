import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: "", password2: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
    this.errorMessages = {username: ["Username can't be blank", "Username has already been taken","Incorrect username or password"],
                          email: ["Email can't be blank", "Email has already been taken"],
                          password: ["Password is too short (minimum is 8 characters)","Incorrect username or password", "Passwords don't match"],
                          password2: ["Passwords don't match"]};
  }

  componentWillReceiveProps(nextProps) {
    // Username can't be blank
    // Incorrect username or password
    // Email can't be blank
    // Password is too short (minimum is 8 characters)
    // Passwords don't match
    // Username has already been taken
    // Email has already been taken
    // if (this.props.errors =)
    // if (nextProps.loggedIn) {
    //   this.props.history.push('/');
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.formType === "signup") {
      if (this.state.password !== this.state.password2) {
        return this.props.nonmatchingPasswords(["Passwords don't match"]);
      }
    }
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

  displayErrors(errorMessages) {
    let relevantErrors = this.props.errors.filter(errorMessage => {
      return errorMessages.includes(errorMessage);
    });
    if (relevantErrors.length === 0) {
      return (<ul className={`session-errors`}>
        <li className="session-error blank">{" "}</li>
      </ul>);
    }

    return  (
      <ul className={`session-errors`}>
        {relevantErrors.map((error) => {
          return <li className="session-error">{error}</li>;
        })}
      </ul>
    );
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
              <label className="session-form-input-box">
                <input type="text" placeholder={usernameText}
                  onChange={this.handleChange("username")} value={this.state.username}></input>
                {this.displayErrors(this.errorMessages.username)}
              </label>

              { this.props.formType ==="signup"
                  ?
                <label className="session-form-input-box">
                  <input type="text" placeholder="Enter your email address"
                    onChange={this.handleChange("email")} value={this.state.email}></input>
                  {this.displayErrors(this.errorMessages.email)}
                </label>
                  :
                null
              }

              <label className="session-form-input-box">
                <input type="password" placeholder={passwordText}
                  onChange={this.handleChange("password")} value={this.state.password}></input>
                {this.displayErrors(this.errorMessages.password)}
              </label>

              { this.props.formType === "signup"
                  ?
                <label className="session-form-input-box">
                  <input type="password" placeholder="Retype your password"
                    onChange={this.handleChange("password2")} value={this.state.password2}></input>
                  {this.displayErrors(this.errorMessages.password2)}
                </label>
                  :
                null
              }

              <input type="submit" value={submitText}></input>
            </form>
          }
        </ReactCSSTransitionGroup>
      </main>
    );
  }
}

export default SessionForm;
