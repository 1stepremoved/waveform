import { connect } from 'react-redux';
import TrackIndexItem from './track_index_item';
import { requestTrack } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.trackId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    request: (id) => dispatch(requestTrack(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem);
