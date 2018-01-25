import { connect } from 'react-redux';
import Upload from './upload.jsx';
import { createTrack, clearTrackErrors } from '../../actions/track_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.track,
    currentUser: state.session.currentUser,
    lastTrackReceived: state.ui.lastTrackReceived
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrack: (formData) => dispatch(createTrack(formData)),
    clearTrackErrors: () => dispatch(clearTrackErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
