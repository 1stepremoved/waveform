import React from 'react';
import { Link } from 'react-router-dom';

class SplashIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonVisible: false};
    this.showButton = this.showButton.bind(this);
    this.hideButton = this.hideButton.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  showButton(e) {
    this.setState({buttonVisible: true});
  }

  hideButton(e) {
    this.setState({buttonVisible: false});
  }

  togglePause() {
    this.props.addToQueueNow(this.props.track.id);
  }

  render () {
    return (
      <section className="splash-index-item">
        <div className="splash-index-item-image"
          onMouseEnter={this.showButton} onMouseLeave={this.hideButton}
          style={{backgroundImage: `url(${this.props.track.imageUrl})`}}>
          {!this.state.buttonVisible ? null :
            <button onClick={this.togglePause} className="splash-index-item-play-button">
              <i className="fas fa-play"></i>
            </button>
          }
        </div>
        <span className="splash-index-item-title">
          <Link to={`/tracks/${this.props.track.id}`}>{this.props.track.title}</Link>
        </span>
        <span className="splash-index-item-username">
          <Link to={`/users/${this.props.track.userId}`}>{this.props.track.username}</Link>
        </span>
      </section>
    );
  }
}

export default SplashIndexItem;
