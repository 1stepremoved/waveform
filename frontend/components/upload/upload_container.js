import { connect } from 'react-redux';
import Upload from './upload.jsx';
import { createTrack } from '../../actions/track_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.track,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTrack: (formData) => dispatch(createTrack(formData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
