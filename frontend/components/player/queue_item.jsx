import React from 'react';
import PlayButtonContainer from '../play_button/play_button_container';
import { Link } from 'react-router-dom';

class QueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.currentTrackId === this.props.trackId,
                  navOpen: false,
                  optsVisible: false,
                  collapsed: false,
                  lastMove: 0};
    this.trackLoaded = this.trackLoaded.bind(this);
    this.setActive =  this.setActive.bind(this);
    this.setInactive =  this.setInactive.bind(this);
    this.fauxTrack = {id: this.props.trackId};
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.addToQueueNext = this.addToQueueNext.bind(this);
    this.addToQueueEnd = this.addToQueueEnd.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleOpts = this.toggleOpts.bind(this);
    this.optsClickout = this.optsClickout.bind(this);
    this.startMove = this.startMove.bind(this);
    this.resolveMove = this.resolveMove.bind(this);
    this.moveQueueItem = this.moveQueueItem.bind(this);
  }

  componentDidMount() {
    if (!this.props.track) {
      this.props.requestTrack(this.props.trackId);
      // this.queueItem.scollIntoViewIfNeeded();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentTrackId === newProps.trackId && newProps.currentTrack === this.props.placeInQueue) {
      this.setState({active: true});
    } else {
      this.setState({active: false});
    }
  }

  componentDidUpdate() {
    if (this.props.placeInQueue === this.props.collapsedQueueItem) {
      this.queueItem.scrollIntoViewIfNeeded();
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
    if (this.props.currentTrack !== this.props.placeInQueue){
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

  renderPanel() {
    return (
      <div className="queue-item-panel">
        {!this.props.currentUser ? null :
          <div onClick={this.toggleLike} className={`queue-index-item-panel-button-left ${this.props.isLiked ? "blue" : ""}`}>
            <i className="fas fa-heart"></i>
          </div>
        }
        <div onClick={this.toggleOpts}
          className={`queue-index-item-panel-button-left ${this.state.optsVisible ? 'toggled' : ''}`}>
          <i className="fas fa-ellipsis-h"></i>
        </div>
        {!this.state.optsVisible ? null :
          <div className="queue-index-item-options-menu">
            <div onClick={(e) => this.props.addToQueueEnd(this.trackLoaded("id"))}>Add to queue</div>
            <div onClick={(e) => this.props.addToQueueNext(this.trackLoaded("id"))}>Play next</div>
          </div>
        }
      </div>
    );
  }

  startMove(e) {
    document.addEventListener("mouseup", this.resolveMove);
    document.addEventListener("mousemove", this.moveQueueItem);
    this.props.collapseQueueItem(this.props.placeInQueue);
    this.props.collapseQueueItemPosition(this.queueItem.getBoundingClientRect()['y']);
    this.setState({
      collapsed: true,
      startY: this.queueItem.getBoundingClientRect()['y'],
      lastMove: Date.now()
    });
  }

  moveQueueItem(e) {
    e.preventDefault();
    // debugger
    e.stopPropagation();
    // if (Date.now() - 300 < this.state.lastMove) {
    //   return;
    // }
    let queueItem;
    if (e.clientY + 50 - this.props.collapsedQueueItemPosition < 0 ) {
      this.props.moveTrack(true);
      queueItem = document.getElementById(`queue-item-${this.props.collapsedQueueItem}`);
      this.props.collapseQueueItemPosition(queueItem.getBoundingClientRect()['y']);
      this.setState({
        startY: this.queueItem.getBoundingClientRect()['y'],
        lastMove: Date.now()
      });
    } else if (e.clientY - 50 - this.props.collapsedQueueItemPosition > 0 ) {
      this.props.moveTrack(false);
      queueItem = document.getElementById(`queue-item-${this.props.collapsedQueueItem}`);
      this.props.collapseQueueItemPosition(queueItem.getBoundingClientRect()['y']);
      this.setState({
        startY: this.queueItem.getBoundingClientRect()['y'],
        lastMove: Date.now()
      });
    }
  }

  resolveMove(e) {
    let target = e.target;
    while (target !== null) {
      if (target.id === "queue-container") {
        this.setState({collapsed: false});
        this.props.collapseQueueItem(-1);
        document.removeEventListener("mouseup", this.resolveMove);
        document.removeEventListener("mousemove", this.moveQueueItem);
        return;
      }
      target = target.parentElement;
    }
    // debugger
    this.setState({collapsed: false});
    if (this.props.currentTrack !== this.props.place){
      this.props.removeFromQueue(this.props.place);
    }
    this.props.collapseQueueItem(-1);
    document.removeEventListener("mouseup", this.resolveMove);
    document.removeEventListener("mousemove", this.moveQueueItem);
  }

  render () {
    return (
      <section className={`queue-item-container ${this.props.collapsed ? "shorten" : ""}`}
        id={`queue-item-${this.props.placeInQueue}`} onMouseEnter={this.setActive}  onMouseLeave={this.setInactive}
        ref={(queueItem) => {this.queueItem = queueItem;}}>
        {this.props.collapsed ? null :
          <div className="queue-item-box">
            <div onMouseDown={this.startMove} className="queue-item-handle">
            </div>
            <div className="queue-item-image"
              style={{backgroundImage: `url(${this.trackLoaded("imageUrl")})`,
              opacity: `${this.state.active ? '1' : '0.5'}`}}>
              <PlayButtonContainer visible={this.state.active} classname="queue-item-play-button"
                track={this.props.track ? this.props.track : this.fauxTrack }
                inQueue={true}
                placeInQueue={this.props.placeInQueue}
                place={this.props.place} />
            </div>
            <div className="queue-item-by-info">
              <div className="queue-item-track-artist" >
                <Link to={`/users/${this.trackLoaded("userId")}`}>{this.trackLoaded("username")}</Link>
              </div>
              <div className="queue-item-track-name"
                style={{color: `${this.state.active ? '#000' : '#999'}`}}>
                <Link to={`/tracks/${this.trackLoaded("id")}`}>{this.trackLoaded("title")}</Link>
              </div>
            </div>
            {!this.state.active ? null : this.renderPanel()}
          </div>
        }
      </section>
    );
  }
}

// <section className={`queue-item-container ${this.state.collapsed ? "shorten" : ""}`}
//   id={`queue-item-${this.props.place}`} onMouseEnter={this.setActive}  onMouseLeave={this.setInactive}>
//   <div onMouseDown={this.startMove} className={`queue-item-handle ${this.state.collapsed ? "shorten" : ""}`}>
//   </div>
//   <div className={`queue-item-image ${this.state.collapsed ? "shorten" : ""}`}
//     style={{backgroundImage: `url(${this.trackLoaded("imageUrl")})`,
//             opacity: `${this.state.active ? '1' : '0.5'}`}}>
//     <PlayButtonContainer visible={!this.state.collapsed && this.state.active} classname="queue-item-play-button"
//       track={this.props.track ? this.props.track : this.fauxTrack }
//       inQueue={true}
//       queuePlace={this.props.place} />
//   </div>
//   <div className={`queue-item-by-info ${this.state.collapsed ? "shorten" : ""}`}>
//     <div className={`queue-item-track-artist ${this.state.collapsed ? "shorten" : ""}`} >
//       <Link to={`/users/${this.trackLoaded("userId")}`}>{this.trackLoaded("username")}</Link>
//     </div>
//     <div className={`queue-item-track-name ${this.state.collapsed ? "shorten" : ""}`}
//       style={{color: `${this.state.active ? '#000' : '#999'}`}}>
//       <Link className={`${this.state.collapsed ? "shorten" : ""}`}
//         to={`/tracks/${this.trackLoaded("id")}`}>{this.trackLoaded("title")}</Link>
//     </div>
//   </div>
//   {!this.state.active || this.state.collapsed ? null : this.renderPanel()}
// </section>

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
