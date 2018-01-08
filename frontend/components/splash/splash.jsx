import React from 'react';
import SplashIndexContainer from './splash_index_container';

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm(formName) {
    this.props.changeForm(formName);
  }

  render() {
    return (!this.props.isRoot ? null :
      <main id="splash-container">
        <section id="splash-bump"></section>

        <section id="splash-image" style={{backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.45), rgba(100, 100, 255, 0.45)), url(${window.staticImages.splash})`}}>
          <section id="splash-forms">
            <div id="splash-forms-left">
              <img src={window.staticImages.logo} id="splash-logo"></img>
              <div>
                WAVEFORM
              </div>
            </div>
            <div id="splash-forms-right">
              <div id="splash-session-buttons-box">
                <div onClick={() => this.openForm("login")} id="splash-login-button">Sign In</div>
                <div onClick={() => this.openForm("signup")} id="splash-signup-button">Create Account</div>
              </div>
            </div>
          </section>
        </section>

        <SplashIndexContainer />
      </main>
    );
  }
}

export default Splash;
