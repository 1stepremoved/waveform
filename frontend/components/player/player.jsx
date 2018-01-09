import React from 'react';
import Sound from 'react-sound';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: this.props.position, newPositon: 0, duration: 1, mousePos: 0, startTrack: this.props.startTrackValue};
    this.toggleState = this.toggleState.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleLastSong = this.handleLastSong.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.moveHandle = this.moveHandle.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  togglePause(e) {
    if (this.props.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.props.pause();
  }

  toggleState(key) {
    return (e) => {
      this.setState({[key]: !this.state[key]});
      this.props[key]();
    };
  }

  componentDidUpdate() {
    if (this.audio && this.props.startTrackValue)  {
      this.audio.play();
      this.props.startTrack(false);
    }
  }


  componentWillReceiveProps(newProps) {

    if (this.audio && this.props.paused !== newProps.paused) {
      if (newProps.paused) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    }
  }

  handlePause(audio) {
    // this.props.setPosition(audio.position);
    // this.setState({position: audio.position});
  }

  handlePlaying(audio) {
    this.setState({position: audio.position, duration: audio.duration});
  }

  handleLastSong(){
    this.props.lastSong();
    this.setState({position: 0});

  }

  handleNextSong(){
    this.props.nextSong();
    this.setState({position: 0});
  }


  handleLoading(audio) {
    this.setState({duration: audio.duration});
  }

  moveHandle(e) {
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    let mousePos = e.pageX - this.timeline.offsetLeft;
    this.setState({mousePos});
  }

  render() {
    return (
      <main id="player-container">
        <section id="player-controls">
          <div onClick={this.handleLastSong} id="player-last-song">
            <i className="fas fa-step-backward"></i>
          </div>
          <div onClick={this.togglePause} id="player-play-button">
            <i className={this.state.paused ? "fas fa-play" : "fas fa-pause"}></i>
          </div>
          <div onClick={this.handleNextSong} id="player-next-song">
            <i className="fas fa-step-forward"></i>
          </div>
          <div onClick={this.toggleState("shuffle")} id="player-shuffle"
            className={this.props.shuffleValue ? "blue" : ""}>
            <i className="fas fa-random"></i>
          </div>
          <div onClick={this.toggleState("repeat")} id="player-repeat"
            className={this.props.repeatValue ? "blue" : ""}>
            <i className="fas fa-redo-alt"></i>
          </div>
        </section>
        {!this.props.track ? null :
          <audio src={this.props.track.audioUrl}
            ref={(audio) => { this.audio = audio ;} }>
          </audio>
        }

        <div onMouseMove={this.moveHandle} id="player-timeline" ref={(timeline) => {this.timeline = timeline;}}>
          <div id="player-handle" ref={(handle) => {this.handle = handle;}}
            style={{marginLeft: (this.state.position / this.state.duration)}}>
          </div>
        </div>

      </main>
    );
  }
}

// <Sound url={this.props.track.audioUrl}
//   onPause={this.handlePause}
//   playFromPosition={this.state.position}
//   onPlaying={this.handlePlaying}
//   onFinishedPlaying={this.handleNextSong}
//   playStatus={!this.props.paused ? Sound.status.PLAYING : Sound.status.PAUSED}
//   />

export default Player;
