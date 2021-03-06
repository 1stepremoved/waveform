import React from 'react';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonVisible: false};
    this.togglePause = this.togglePause.bind(this);
    this.isPauseButton = this.isPauseButton.bind(this);
  }

  togglePause() {
    if (this.props.currentId !== this.props.track.id || (this.props.inQueue && this.props.placeInQueue !== this.props.currentTrack)){
      if (this.props.inQueue) {
        this.props.moveToTrack(this.props.placeInQueue);
      } else {
        this.props.addToQueueNow(this.props.track.id);
      }
    } else {
      this.props.pause();
    }
  }

  isPauseButton() {
    if (this.props.currentlyPlaying) {
      if (this.props.inQueue) {
        return this.props.currentTrack === this.props.placeInQueue && !this.props.paused;
      } else {
        return !this.props.paused;
      }
    }
    return false;
  }

  render() {
    return (
      !this.props.visible && !(this.props.currentId === this.props.track.id) ? null :
      (<button onClick={this.togglePause} className={this.props.classname}
        style={{display: 'flex', justifyContent: 'center',
          backgroundImage: `url(${this.isPauseButton() ? window.staticImages.pause : window.staticImages.play})`,
          backgroundPosition: `${this.isPauseButton() ? 'center' : '60% 50%'}`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat"}}>
      </button>)
    );
  }
}

// {this.props.paused && this.props.currentlyPlaying ?
//   <div style={{background: `url(${window.staticImages.pause})`,
//                height: '25px', width: '25px', backgroundColor: 'white',
//                display: 'cover', backgroundPosition: "center"}} ></div>
//   :
//   <div style={{background: `url(${window.staticImages.play})`,
//                height: '25px', width: '25px', backgroundColor: 'white',
//                display: 'cover', backgroundPosition: "center"}} ></div>
// }

export default PlayButton;
