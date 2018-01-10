import React from 'react';
import SplashIndexItemContainer from './splash_index_item_container';

class SplashIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestTracks(12);
  }

  render() {
    return(
      <section id="splash-index-box">
        <div id="splash-index-title">
          Here's what's trending in the WaveForm community
        </div>
        <div id="splash-index">
          {this.props.tracks.map(track => {
            return <SplashIndexItemContainer key={track.id} track={track}/>;
          })}
        </div>
      </section>
    );
  }
}

export default SplashIndex;
