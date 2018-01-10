import React from 'react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 0, newPositon: 0, duration: 1, mousePos: 0,
                  startTrack: this.props.startTrackValue,
                  handleVisible: false,
                  volumeVisible: false,
                  volumePos: 0,
                  mouseDown: false};
    this.toggleState = this.toggleState.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleLastSong = this.handleLastSong.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.moveHandle = this.moveHandle.bind(this);
    this.hideHandle = this.hideHandle.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.setAudioTime = this.setAudioTime.bind(this);
    this.toggleVolumeVisible = this.toggleVolumeVisible.bind(this);
    this.toggleMouseDown = this.toggleMouseDown.bind(this);
    this.moveVolumeHandler = this.moveVolumeHandler.bind(this);
  }

  togglePause(e) {
    if (!this.audio) {
      return;
    }
    if (this.props.paused) {
      this.audio.play();
      const that = this;
      this.currentTimeCheck = setInterval(() => {
        this.setState({position: that.audio.currentTime});
      },500);
    } else {
      this.audio.pause();
      clearInterval(this.currentTimeCheck);
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
      this.props.startTrack(false);
      const that = this;
      this.audio.addEventListener('loadedmetadata', () => {
        that.audio.play();
        that.setState({duration: that.audio.duration});
        that.audio.onended = this.props.nextSong;
      }, false);
      this.currentTimeCheck = setInterval(() => {
        this.setState({position: that.audio.currentTime});
      },500);
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
    // let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    let mousePos = e.pageX - this.timeline.offsetLeft;
    if (mousePos > this.timeline.offsetWidth) {
      mousePos = this.timeline.offsetWidth;
    } else if (mousePos < 0) {
      mousePos = 0;
    }
    this.setState({mousePos, handleVisible: true});
  }

  hideHandle(e) {
    this.setState({handleVisible: false});
  }

  setAudioTime() {
    if (this.audio) {
      this.audio.currentTime = (this.state.mousePos / this.timeline.offsetWidth * this.state.duration);
      this.setState({position: this.audio.currentTime});
    }
  }

  toggleVolumeVisible() {
    this.setState({volumeVisible: !this.state.volumeVisible});
  }

  moveVolumeHandler(e) {
    if (!this.state.mouseDown) {
      return;
    }
    let volumePos = e.pageY - this.volumeTrack.offsetBottom;
    if (volumePos > this.volumeTrack.offsetBottom) {
      volumePos = this.volumeTrack.offsetBottom;
    } else if (volumePos < 0) {
      volumePos = 0;
    }
    this.setState({volumePos});
  }

  toggleMouseDown(value) {
    return ()=> {
      this.setState({mouseDown: value});
    };
  }

  parseTime(secs) {
    const seconds = parseInt(secs % 60);
    const minutes = parseInt(secs / 60);
    const secsS = `${seconds < 10 ? '0' : ''}${seconds}`;
    return `${minutes}:${secsS}`;
  }

  render() {

    const pauseButton = this.props.paused ?
      (<i className="fa fa-play"></i>)
      :
      (<i className="fa fa-pause"></i>);
    return (
      <main id="player-container">
        <section id="player-controls">
          <div onClick={this.handleLastSong} id="player-last-song">
            <i className="fas fa-step-backward"></i>
          </div>
          <div onClick={this.togglePause} id="player-play-button">
            {pauseButton}
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

        <section id="player-timeline-container-box">
          <div id="player-current-time">{this.parseTime(this.state.position)}</div>
          <div id="player-timeline-container"
            onMouseMove={this.moveHandle} onMouseLeave={this.hideHandle}
            onClick={this.setAudioTime}>
            <div id="player-timeline"
              ref={(timeline) => {this.timeline = timeline;}}
              style={{background: `linear-gradient(90deg, #1177ff,
                #1177ff ${(this.state.position / this.state.duration * 100)}%,
                gray 0%, gray)`}}>

                {!this.state.handleVisible ? null :
                  <div id="player-handle" ref={(handle) => {this.handle = handle;}}
                    style={{marginLeft: this.state.mousePos}}>
                  </div>
                }
            </div>
          </div>
          <div id="player-duration-time">{this.parseTime(this.state.duration)}</div>
        </section>


        <section id="player-volume-container">
          {!this.state.volumeVisible ? null :
            <div onMouseOver={this.moveVolumeHandler}
              onMouseDown={this.toggleMouseDown(true)} onMouseUp={this.toggleMouseDown(false)}
              id="player-volume-track-box">
              <div id="player-volume-track"
                ref={(volumeTrack) => {this.volumeTrack = volumeTrack;}}>
                <div id="player-volume-handler"
                  style={{marginBottom: this.state.volumePos}}>
                </div>
              </div>
            </div>
          }
          <div onClick={this.toggleVolumeVisible}id="player-volume-icon">
            <i className="fas fa-volume-up"></i>
          </div>
        </section>

      </main>
    );
  }
}


export default Player;
