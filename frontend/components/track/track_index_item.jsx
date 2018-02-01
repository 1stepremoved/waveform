import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';
import { Link } from 'react-router-dom';

class TrackIndexItem extends React.Component {
  constructor(props){
    super(props);
    let liked = false;

    this.state = {
      buttonVisible: false,
      optsVisible: false
    };
    this.trackLoaded = this.trackLoaded.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleOpts = this.toggleOpts.bind(this);
    this.optsClickout = this.optsClickout.bind(this);
  }


  componentDidMount() {
    if (!this.props.track){
      this.props.requestTrack(this.props.trackId);
    }
  }

  trackLoaded(key){
    return this.props.track ? this.props.track[key] : null;
  }

  toggleLike() {
    if (this.props.currentUser.likes && this.props.currentUser.likes[this.trackLoaded("id")]) {
      this.props.deleteLike(this.props.currentUser.likes[this.trackLoaded("id")].id);
    } else {
      this.props.createLike({
        user_id: this.props.currentUser.id,
        likeable_id: this.props.track.id,
        likeable_type: "Track"
      });
    }
  }

  toggleOpts(e){
    if (this.state.optsVisible) {
      this.setState({optsVisible: false});
      const that = this;
      document.removeEventListener('click', this.optsClickout);
    } else {
      this.setState({optsVisible: true});
      document.addEventListener("click", this.optsClickout);
    }
  }

  optsClickout(e) {
    let target = e.target;
    this.setState({optsVisible: false});
    document.removeEventListener('click', this.optsClickout);
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
              {!this.props.currentUser ? null :
                <div onClick={this.toggleLike} className={`track-index-item-panel-button-left ${this.props.isLiked ? "background-blue" : ""}`}>
                  <i className="fas fa-heart"></i>
                </div>
              }
              <div onClick={this.toggleOpts}
                className={`track-index-item-panel-button-left ${this.state.optsVisible ? 'toggled' : ''}`}>
                <i className="fas fa-ellipsis-h"></i>
              </div>
              {!this.state.optsVisible ? null :
                <div className="track-index-item-options-menu">
                  <div onClick={(e) => this.props.addToQueueEnd(this.trackLoaded("id"))}>Add to queue</div>
                  <div onClick={(e) => this.props.addToQueueNext(this.trackLoaded("id"))}>Play next</div>
                </div>
              }
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
