import { connect } from 'react-redux';
import SplashIndex from './splash_index';
import { requestTracks } from '../../actions/track_actions';

const mapStateToProps = (state) => {
  return {
    tracks: Object.keys(state.entities.tracks).map(trackKey => {
      return state.entities.tracks[trackKey];
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTracks: (query,offset) => dispatch(requestTracks(query,offset))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashIndex);
