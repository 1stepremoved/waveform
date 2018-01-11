import { connect } from 'react-redux';
import TrackShow from './track_show';
import { requestTrack } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.match.params.trackId],
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTrack: (id) => dispatch(requestTrack(id))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TrackShow);
