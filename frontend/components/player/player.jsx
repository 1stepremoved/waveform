import React from 'react';
import QueueContainer from './queue_container';
import { Link } from 'react-router-dom';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: 0, newPositon: 0, duration: 1, mousePos: 0,
                  startTrack: this.props.startTrackValue,
                  handleVisible: false,
                  volume: 1,
                  mouseDown: false,
                  cached: false};

    document.body.onkeyup = (e) => {
      if(e.keyCode === "32" && this.props.currentId){
        this.props.pause();
      }
    };
    this.toggleState = this.toggleState.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleLastSong = this.handleLastSong.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.moveHandle = this.moveHandle.bind(this);
    this.hideHandle = this.hideHandle.bind(this);
    this.showHandle = this.showHandle.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.setAudioTime = this.setAudioTime.bind(this);
    this.toggleVolumeVisible = this.toggleVolumeVisible.bind(this);
    this.toggleMouseDown = this.toggleMouseDown.bind(this);
    this.volumeHandler = this.volumeHandler.bind(this);
    this.toggleQueue = this.toggleQueue.bind(this);
    this.trackLoaded = this.trackLoaded.bind(this);
  }

  togglePause(e) {
    if (!this.audio) {
      return;
    }
    if (this.props.paused) {
      this.audio.play();
      const that = this;
      clearInterval(this.currentTimeCheck);
      this.currentTimeCheck = setInterval(() => {
        this.setState({position: that.audio ? that.audio.currentTime : 0});
        this.props.setPosition(that.audio ? that.audio.currentTime : 0);
      },500);
    } else {

      if (this.props.track.audioDataURL && !this.state.cached) {
        let currentTime = this.audio.currentTime;
        this.audio.src = this.props.track.audioDataURL;
        this.audio.currentTime = currentTime;
        this.setState({cached: true});
      }
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
      if (this.props.track.audioDataURL) {
        this.audio.src = this.props.track.audioDataURL;
      }
      this.audio.addEventListener('loadedmetadata', () => {
        that.audio.play();
        that.setState({duration: that.audio.duration});
        that.audio.onended = this.props.nextSong;
        clearInterval(this.currentTimeCheck);
        this.currentTimeCheck = setInterval(() => {
          this.setState({position: that.audio ? that.audio.currentTime : 0});
          this.props.setPosition(that.audio ? that.audio.currentTime : 0);
        },500);
      }, false);
    }
    if (this.props.restart && this.audio) {
      this.audio.currentTime = 0;
      this.props.resetRestart();
    }
    // if (this.props.track && this.props.track.audioDataURL) {
    //   this.audio.src = this.props.track.audioDataURL;
    // }
  }


  componentWillReceiveProps(newProps) {
    if (newProps.track && newProps.track.audioDataURL) {
      this.setState({cached: true});
    } else {
      this.setState({cached: false});
    }
    if (this.audio && this.props.paused !== newProps.paused) {
      if (newProps.paused) {
        this.audio.pause();
        clearInterval(this.currentTimeCheck);
      } else {
        this.audio.play();
        const that = this;
        clearInterval(this.currentTimeCheck);
        this.currentTimeCheck = setInterval(() => {
          this.setState({position: that.audio ? that.audio.currentTime : 0});
          this.props.setPosition(that.audio ? that.audio.currentTime : 0);
        },500);
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

  moveHandle(e, override=false) {
    // let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    if (!this.state.mouseDown && !override){
      return;
    }
    let mousePos = e.pageX - this.timeline.offsetLeft;
    if (mousePos > this.timeline.offsetWidth) {
      mousePos = this.timeline.offsetWidth;
    } else if (mousePos < 0) {
      mousePos = 0;
    }
    this.setState({mousePos, handleVisible: true});
  }

  showHandle(e) {
    this.setState({handleVisible: true});
  }

  hideHandle(e) {
    this.setState({handleVisible: false});
  }

  setAudioTime() {
    if (this.audio && this.state.handleVisible === true) {
      if (this.props.track.audioDataURL && !this.state.cached) {
        this.audio.src = this.props.track.audioDataURL;
        this.setState({cached: true});
      }
      this.audio.currentTime = (this.state.mousePos / this.timeline.offsetWidth * this.state.duration);
      this.setState({position: this.audio.currentTime, mouseDown: false});
    }
  }

  toggleVolumeVisible() {
    if (this.props.currentMenu !== "volume") {
      this.props.changeMenu("volume");
    } else {
      this.props.changeMenu(null);
    }
  }

  volumeHandler(e) {
    if (this.audio) {
      this.setState({volume: 1 - e.target.value});
      this.audio.volume = 1 - e.target.value;
    }
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

  toggleQueue(e) {
    if (e.target.parentElement.parentElement.id === "player-queue-toggle" ||
        e.target.parentElement.id === "player-queue-toggle"){
      if (!this.props.queueVisible) {

        this.props.changeMenu("queue");
      } else {
        this.props.changeMenu(null);
      }
    }
  }

  trackLoaded(key, alt=null) {
    return this.props.track ? this.props.track[key] : alt;
  }

  render() {
    const pauseButton = this.props.paused ?
      (<i className="fa fa-play"></i>)
      :
      (<i className="fa fa-pause"></i>);
    return (

      <main id="player-container-box"
        className={`collapsable ${this.props.currentId || this.props.queueLength > 0 ? "uncollapsed-up" : "collapsed-up"}`}
        style={{transformOrigin: 'bottom'}}>
        <main id="player-container">
          <section id="player-controls">
            <div onClick={this.handleLastSong} id="player-last-song">
              <i className="fas fa-step-backward"></i>
            </div>
            { (!navigator.onLine && (this.props.track && !this.props.track.audioDataURL)) ?
              <div className="player-loader"></div>
                :
              <div onClick={this.togglePause} id="player-play-button"
                style={{backgroundImage: `url(${this.props.paused ? window.staticImages.play : window.staticImages.pause})`}}>
              </div>
            }
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

          {!this.props.track || (!navigator.onLine && !this.props.track.audioDataURL) ? null :
            <audio src={this.props.track.audioUrl}
              ref={(audio) => { this.audio = audio ;}} >
            </audio>
          }

          <section id="player-timeline-container-box">
            <div id="player-current-time">{this.parseTime(this.state.handleVisible && this.state.mouseDown ?
                this.state.mousePos / this.timeline.offsetWidth * this.state.duration : this.state.position)}</div>
            <div id="player-timeline-container"
              onMouseMove={this.moveHandle} onMouseLeave={this.hideHandle} onMouseEnter={this.showHandle}
              onMouseDown={(e)=>{this.setState({mouseDown: true});this.moveHandle(e,true);}} onMouseUp={this.setAudioTime}>
              <div id="player-timeline"
                ref={(timeline) => {this.timeline = timeline;}}
                style={{background: `linear-gradient(90deg, #1177ff,
                  #1177ff ${(this.state.mouseDown ? (this.state.mousePos / this.timeline.offsetWidth * 100) : (this.state.position / this.state.duration * 100))}%,
                  gray 0%, gray)`}}>

                  {!this.state.handleVisible ? null :
                    <div id="player-handle" ref={(handle) => {this.handle = handle;}}
                      style={{marginLeft: this.state.mouseDown ? this.state.mousePos : (this.state.position / this.state.duration * this.timeline.offsetWidth)}}>
                    </div>
                  }
              </div>
            </div>
            <div id="player-duration-time">{this.parseTime(this.state.duration)}</div>
          </section>


          <section id="player-volume-container">
            {this.props.currentMenu !== "volume" ? null :
              <div id="player-volume-track-box">
                <input type='range' id="player-volume-track" min="0" max="1" step="0.01"
                  value={1 - this.state.volume} onChange={this.volumeHandler}>
                </input>
              </div>
            }
            <div onClick={this.toggleVolumeVisible} id="player-volume-icon">
              <i className="fas fa-volume-up"></i>
            </div>
          </section>

          <section id="player-queue-container">
            <div id="player-queue-image"
              style={{backgroundImage: `url(${this.trackLoaded("imageUrl", "")})`}}>
            </div>
            <div id="player-queue-by-info">
              <div id="player-queue-track-artist">
                <Link to={`/users/${this.trackLoaded("userId")}`}>{this.trackLoaded("username")}</Link>
              </div>
              <div id="player-queue-track-name">
                <Link to={`/tracks/${this.trackLoaded("id")}`}>{this.trackLoaded("title")}</Link>
              </div>
            </div>
          </section>

          <section id={`player-queue-toggle`} className={this.props.queueVisible ? "blue" : ""}
            onClick={this.toggleQueue}>
            <i className="fas fa-list-ul"></i>
              {this.props.currentMenu !== "queue" ? null :
                <QueueContainer />
              }
          </section>

        </main>
      </main>

    );
  }
}


export default Player;
