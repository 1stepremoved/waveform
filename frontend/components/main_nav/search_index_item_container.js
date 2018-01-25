import { connect } from 'react-redux';
import SearchIndexItem from './search_index_item';
import { clearSearchTracks, resetSearch } from '../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.trackId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSearchTracks: () => dispatch(clearSearchTracks()),
    resetSearch: (value) => dispatch(resetSearch(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchIndexItem);
