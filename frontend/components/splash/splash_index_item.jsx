import React from 'react';
import { Link } from 'react-router-dom';
import PlayButtonContainer from '../play_button/play_button_container';

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
          <PlayButtonContainer classname="splash-index-item-play-button"
            visible={this.state.buttonVisible} track={this.props.track}></PlayButtonContainer>
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
