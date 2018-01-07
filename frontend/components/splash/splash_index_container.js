import { connect } from 'react-redux';
import SplashIndex from './splash_index';

const mapStateToProps = (state) => {
  return {
    tracks: state.entities.tracks
  };
};
