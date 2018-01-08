import React from 'react';

class SplashIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonVisible: false};
    this.showButton = this.showButton.bind(this);
    this.hideButton = this.hideButton.bind(this);
  }

  showButton(e) {
    this.setState({buttonVisible: true});
  }

  hideButton(e) {
    this.setState({buttonVisible: false});
  }

  render () {
    return (
      <section className="splash-index-item">
        <div className="splash-index-item-image"
          onMouseEnter={this.showButton} onMouseLeave={this.hideButton}
          style={{backgroundImage: `url(${this.props.track.imageUrl})`}}>
          {!this.state.buttonVisible ? null :
            <button className="splash-index-item-play-button">
              <i className="fas fa-play"></i>
            </button>
          }
        </div>
        <span className="splash-index-item-title">
          {this.props.track.title}
        </span>
        <span className="splash-index-item-username">
          {this.props.track.username}
        </span>
      </section>
    );
  }
}

export default SplashIndexItem;
