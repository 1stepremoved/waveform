import React from 'react';
import QueueItemContainer from './queue_item_container';

class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.closeQueue = this.closeQueue.bind(this);
    this.clearQueue = this.clearQueue.bind(this);
  }

  closeQueue() {
    this.props.changeMenu(null);
  }

  clearQueue() {
    this.props.clearQueue(this.props.currentId);
  }

  render () {
    let trackId;
    return (
      <main id="queue-container">
        <section id="queue-controls">
          <div onClick={this.clearQueue} id="queue-clear-button">
            Clear
          </div>
          <div onClick={this.closeQueue} id="queue-close-button">
            <i className="fas fa-times"></i>
          </div>
        </section>
        <section id="queue-index-container">
          {this.props.order.map((place, id)=> {
            trackId = this.props.trackIds[place];
            return <QueueItemContainer key={id} placeInQueue={id} place={place} trackId={trackId} />;
          })}
        </section>
      </main>
    );
  }
}

export default Queue;
