import React from 'react';
import { Link } from 'react-router-dom';

class SearchIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.resetSearch(true);
    this.props.clearSearchTracks(0);
  }

  render() {
    return (
      <Link onClick={this.handleClick} to={`/tracks/${this.props.track.id}`} className="search-index-item-container"
        autocomplete="off">
        <div className="search-index-item">
          <i className="fas fa-search"></i> {this.props.track.title}
        </div>
      </Link>
    );
  }
}

export default SearchIndexItem;
