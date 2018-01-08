import React from 'react';
import { Link } from 'react-router-dom';

class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: (this.props.track) ? this.props.track.username : null,
      title: (this.props.track) ? this.props.track.title : null,
      imageUrl: (this.props.track) ? this.props.track.imageUrl : null,
      userImageUrl: (this.props.track) ? this.props.track.userImageUrl : null,
      description: (this.props.track) ? this.props.track.description : null
    };
  }

  componentDidMount() {
    const that = this;
    this.props.requestTrack(this.props.match.params.trackId)
      .then(()=>{
        that.setState({
          username: this.props.track.username,
          title: this.props.track.title,
          imageUrl: this.props.track.imageUrl,
          userImageUrl: this.props.track.userImageUrl,
          description: this.props.track.description
        });
      });
  }


  render() {
    return (
      <main id="user-show-container">
        <section id="user-show-header">
          <div id="user-show-header-left">
            <div id="user-show-header-info">
              <button id="user-show-header-play-button">
                <i className="fas fa-play"></i>
              </button>
              <div id="user-show-header-by-info">
                <span id="user-show-header-username">
                  {this.state.username}
                </span>
                <span id="user-show-header-title">
                  {this.state.title}
                </span>
              </div>
            </div>
          </div>
          <div id="user-show-header-image"
            style={{backgroundImage: `url(${this.state.imageUrl})`}}>
          </div>
        </section>

        <section id="user-show-info">
          <div id="user-show-info-user">
            <div id="user-show-info-user-image"
              style={{backgroundImage: `url(${this.state.userImageUrl})`}}>
            </div>
            <span id="user-show-info-user-username">
              {this.state.username}
            </span>
          </div>
          <div id="user-show-info-description">
            <span>Description:</span>
            {this.state.description}
          </div>
        </section>
      </main>
    );
  }
}

export default TrackShow;
