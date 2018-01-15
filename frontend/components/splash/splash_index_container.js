import { connect } from 'react-redux';
import SplashIndex from './splash_index';
import { requestTracksForSplash } from '../../actions/track_actions';

const mapStateToProps = (state) => {
  return {
    tracks: state.ui.splashTrackIds.map(trackKey => {
      return state.entities.tracks[trackKey];
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTracksForSplash: (offset,query) => dispatch(requestTracksForSplash(offset,query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashIndex);
