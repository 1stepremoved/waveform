import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';

class QueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.currentTrackId === this.props.trackId,
                  navOpen: false};
    this.trackLoaded = this.trackLoaded.bind(this);
    this.setActive =  this.setActive.bind(this);
    this.setInactive =  this.setInactive.bind(this);
    this.fauxTrack = {id: this.props.trackId};
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.addToQueueNext = this.addToQueueNext.bind(this);
    this.addToQueueEnd = this.addToQueueEnd.bind(this);
  }

  componentDidMount() {
    if (!this.props.track) {
      this.props.requestTrack(this.props.trackId);
    }
  }

  trackLoaded(key) {
    if (this.props.track) {
      return this.props.track[key];
    }
    return null;
  }

  setActive() {
    this.setState({active: true});
  }

  setInactive() {
    if (this.props.currentTrackId !== this.props.trackId){
      this.setState({active: false});
    }
  }

  removeFromQueue() {
    this.props.removeFromQueue(this.props.trackId);
  }

  addToQueueNext() {
    this.props.addToQueueNext(this.props.trackId);
  }

  addToQueueEnd() {
    this.props.addToQueueEnd(this.props.trackId);
  }

  render () {
    return (
      <section className="queue-item-container"
        onMouseEnter={this.setActive}  onMouseLeave={this.setInactive} >
        <div className="queue-item-image"
          style={{backgroundImage: `url(${this.trackLoaded("imageUrl")})`}}>
          <PlayButtonContainer visible={this.state.active} classname="queue-item-play-button"
            track={this.props.track ? this.props.track : this.fauxTrack } />
        </div>
        <div className="queue-item-by-info">
          <div className="queue-item-track-artist" >
            {this.trackLoaded("username")}
          </div>
          <div className="queue-item-track-name">
            {this.trackLoaded("title")}
          </div>
        </div>
        {!this.state.active ? null :
          <div onClick={()=>{this.setState({navOpen: !this.state.navOpen});}} className="queue-item-nav-toggle">

            <i className="fas fa-ellipsis-h"></i>
          </div>
        }
      </section>
    );
  }
}

// {!this.state.navOpen ? null :
//   <section className="queue-item-nav">
//     {this.state.currentTrackId === this.props.trackId ? null :
//       <div className={this.removeFromQueue} className="queue-item-nav-remove">
//         Remove from queue
//       </div>
//     }
//     <div className={this.removeFromQueue} className="queue-item-nav-add-next"
//       onClick={this.addToQueueNext}>
//       Play next
//     </div>
//     <div className={this.removeFromQueue} className="queue-item-nav-add-end"
//       onClick={this.addToQueueEnd}>
//       Add to queue
//     </div>
//   </section>
// }

export default QueueItem;
