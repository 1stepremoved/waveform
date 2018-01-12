import React from 'react';
import { Link } from 'react-router-dom';

class SearchIndexItem extends React.Component {
  render() {
    return (
      <Link to={`/tracks/${this.props.track.id}`} className="search-index-item-container"
        autocomplete="off" onClick={()=>this.props.clearSearchTracks(0)}>
        <div className="search-index-item">
          <i className="fas fa-search"></i> {this.props.track.title}
        </div>
      </Link>
    );
  }
}

export default SearchIndexItem;
