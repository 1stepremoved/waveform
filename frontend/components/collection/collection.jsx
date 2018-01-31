import React from 'react';
import TrackIndexItemContainer from '../track/track_index_item_container';

class Collection extends React.Component {
  constructor(props){
    super(props);
    this.state = {trackRequestOffset: 0};
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.requestLikedTracks(12);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetVisibleTracks();
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    if (window.innerHeight + window.pageYOffset > this.collection_page.scrollHeight) {
      if (!this.props.waitingForTracks
        && this.props.visibleTrackIds.length < this.props.totalTracks){
          this.props.requestLikedTracks(12, this.state.trackRequestOffset + 12);
          this.setState({trackRequestOffset: this.state.trackRequestOffset + 12});
          this.props.changeWaitingTracks(true);
      }
    }
  }

  render() {
    return (
      <main id="collection-container" ref={(collection) => {this.collection_page = collection;}}>
        {this.props.visibleTrackIds.length === 0 ?
          <div id="collection-default-message">
            <p>You haven't liked anything yet.</p>
            <p>Why so picky?</p>
          </div>

          :

          <section>
            <div id="collection-track-message">
              These are your favorite tracks
            </div>
            <div id="user-tracks">
              {this.props.visibleTrackIds.map((trackId, idx) => {
                return <TrackIndexItemContainer  key={idx} trackId={trackId} />;
              })}
            </div>
            {this.props.visibleTrackIds.length < this.props.totalTracks ?
              <div className="user-show-loader"></div> : null
            }
          </section>

        }
      </main>
    );
  }

}

export default Collection;
