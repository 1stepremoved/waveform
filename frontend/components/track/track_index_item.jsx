import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';
import { Link } from 'react-router-dom';

class TrackIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {buttonVisible: false};
    this.trackLoaded = this.trackLoaded.bind(this);
  }


  componentDidMount() {
    if (!this.props.track){
      this.props.requestTrack(this.props.trackId);
    }
  }

  trackLoaded(key){
    return this.props.track ? this.props.track[key] : null;
  }

  render() {
    return (
      <section className="track-index-item-container">
        <div className="track-index-item-image"
          onMouseEnter={this.showButton} onMouseLeave={this.hideButton}
          style={{backgroundImage: `url(${this.trackLoaded("imageUrl")})`}}>
        </div>
        <div className="track-index-item-info-box">
          <div className="track-index-item-info">
            <PlayButtonContainer classname="track-index-item-play-button"
              visible={true} track={this.props.track}></PlayButtonContainer>
            <div className="track-index-item-by-info">
              <Link to={`/users/${this.trackLoaded("userId")}`} className="track-index-item-username">
                {this.trackLoaded("username")}
              </Link>
              <Link to={`/tracks/${this.trackLoaded("id")}`} className="track-index-item-title">
                {this.trackLoaded("title")}
              </Link>
            </div>
          </div>
          <div className="track-index-item-panel">
            <div className="track-index-item-panel-left">
              <div className="track-index-item-panel-button-left">
                <i className="fas fa-heart"></i>
              </div>
              <div className="track-index-item-panel-button-left">
                <i className="fas fa-retweet"></i>
              </div>
              <div className="track-index-item-panel-button-left">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div className="track-index-item-panel-right">
              <Link to={`/tracks/${this.trackLoaded("id")}`} className="track-index-item-panel-button-right">
                <i className="fas fa-comment"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TrackIndexItem;
