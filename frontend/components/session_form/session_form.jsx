import React from 'react';

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: "", password2: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitAction({
      username: this.state.username,
      password: this.state.password
    }).then(() => this.history.push("/stream"));
  }

  handleChange(type) {
    return (e) => {
      this.setState({[type]: e.target.value});
    };
  }

  render () {
    const submitText = (this.props.formType === "login") ? "Sign In" : "Create Account";
    return (
      <main className="session-form-screen">
        <form onSubmit={this.handleSubmit} className="session-form">
          <label>
            <input type="text" placeholder="Choose a username"
              onChange={this.handleChange("username")} value={this.state.username}></input>
          </label>
          <label>
            <input type="text" placeholder="Enter your email address"
              onChange={this.handleChange("email")} value={this.state.email}></input>
          </label>
          <label>
            <input type="password" placeholder="Choose a password"
              onChange={this.handleChange("password")} value={this.state.password}></input>
          </label>
          {
          this.props.formType === "signup" ?
            <label>
              <input type="password" placeholder="Retype your password"
                onChange={this.handleChange("password2")} value={this.state.password2}></input>
            </label> : null
          }
          <label className="session-errors">
            {this.props.errors.map((error) => {
              error
            })}
          </label>
          <input type="submit" value={submitText}></input>
        </form>
      </main>
    );
  }
}

export default SessionForm;
