import React from 'react';
import {Transition} from 'react-transition-group';

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: "", password2: "", page: 1, in: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
    this.errorMessages = {
      username: ["Username can't be blank", "Username has already been taken"],
      email: ["Email can't be blank", "Email has already been taken"],
      password: ["Password is too short (minimum is 8 characters)","Incorrect username or password", "Passwords don't match"],
      password2: ["Passwords don't match"]};
    this.errorClassName = this.errorClassName.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.revertPage = this.revertPage.bind(this);
    this.pages = this.pages.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.page === 1) {
      const errors = [];
      if (this.state.username === "") {errors.push("Username can't be blank");}
      if (this.state.email === "" && this.props.formType === "signup") {errors.push("Email can't be blank");}
      if (errors.length === 0) {
        this.props.clearErrors();
        return this.setState({page: 2});
      } else {
        return this.props.addError(errors);
      }
    }
    if (this.props.formType === "signup") {
      if (this.state.password !== this.state.password2) {
        return this.props.addError(["Passwords don't match"]);
      }
    }
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    if (this.props.formType === "signup") {
      user.email = this.state.email;
    }

    if (this.props.formType === "signup") {
      this.props.signUp(user)
        .then(() => {
          this.props.history.push("/stream");
          this.props.changeForm(null);
        });
    } else {
      this.props.logIn(user)
        .then(() => {
          this.props.history.push("/stream");
          this.props.changeForm(null);
        });
    }
  }

  guestLogin() {
    let user = {
      username: "guest",
      password: "guestguest"
    };
    this.props.logIn(user).then(() => {
      this.props.history.push("/stream");
      this.props.changeForm(null);
    });
  }

  handleChange(type) {
    return (e) => {
      this.setState({[type]: e.target.value});
    };
  }

  closeForm(e) {
    if (e.target.className === "session-form-screen") {
      this.props.changeForm(null);
      this.setState({username: "", email: "", password: "", password2: "", page: 1, in: false});
      this.props.clearErrors();
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

  errorClassName(errorType) {
    let relevantErrors = this.props.errors.filter(error => {
      return this.errorMessages[errorType].includes(error);
    });
    return (relevantErrors.length === 0) ? "session-form-input" : `session-form-input bad-input`;
  }

  firstPage() {
    let submitText, usernameText, passwordText;
    submitText = "Continue";
    if (this.props.formType === "login") {
      usernameText = "Enter your username or email address";
    } else {
      usernameText = "Choose a username";
    }
    return (
      <main key='0'className="session-form-screen" onClick={this.closeForm}>
        <form key={1} onSubmit={this.handleSubmit} className="session-form">
          <div className="session-form-inputs-container">
            <label className="session-form-input-box">
              <input type="text" placeholder={usernameText}
                onChange={this.handleChange("username")} value={this.state.username}
                className={this.errorClassName("username")}></input>
              {this.displayErrors(this.errorMessages.username)}
            </label>

            { this.props.formType === "signup"
              ?
              <label className="session-form-input-box">
                <input type="text" placeholder="Enter your email address"
                  onChange={this.handleChange("email")} value={this.state.email}
                  className={this.errorClassName("email")}></input>
                {this.displayErrors(this.errorMessages.email)}
              </label>
              :
              null
            }
            <input type="submit" value={submitText}></input>
          </div>
          <form onSubmit={this.guestLogin}>
            <input id="guest-login-input" type="submit" value="Log in as guest"></input>
          </form>
        </form>
      </main>
    );
  }

  revertPage() {
    this.setState({page: 1});
  }

  secondPage() {
    let submitText, usernameText, passwordText;
    submitText = "Continue";
    if (this.props.formType === "login") {
      passwordText = "Enter your password";
    } else {
      passwordText = "Choose a password";
    }
    return (
      <main key='0' className="session-form-screen" onClick={this.closeForm}>
        <form key={1} onSubmit={this.handleSubmit} className="session-form" >
          <div className="session-form-inputs-container">

            <label className="session-form-input-box">
              <a onClick={this.revertPage} className="false-username">{`◀ ${this.state.username}`}</a>
              {this.displayErrors(this.errorMessages.username)}
            </label>

            { this.props.formType === "signup" ?

              <label className="session-form-input-box">
                <a onClick={this.revertPage} className="false-email">{`◀ ${this.state.email}`}</a>
                {this.displayErrors(this.errorMessages.email)}
              </label>
               :
              null
            }

            <label className="session-form-input-box">
              <input type="password" placeholder={passwordText}
                onChange={this.handleChange("password")} value={this.state.password}
                className={this.errorClassName("password")}></input>
              {this.displayErrors(this.errorMessages.password)}
            </label>

            { this.props.formType === "signup"
              ?
              <label className="session-form-input-box">
                <input type="password" placeholder="Retype your password"
                  onChange={this.handleChange("password2")} value={this.state.password2}
                  className={this.errorClassName("password2")}></input>
                {this.displayErrors(this.errorMessages.password2)}
              </label>
              :
              null
            }
            <input type="submit" value={submitText}></input>
            </div>
          </form>
      </main>
    );
  }

  pages() {
    return (
      this.state.page === 1 ? this.firstPage() : this.secondPage()
    );
  }

  render () {

    return (
      this.props.formType ? this.pages() : null
    );
  }
}

export default SessionForm;
