import { connect } from 'react-redux';
import Collection from './collection';
import { requestLikedTracks } from '../../actions/track_actions';
import { changeWaitingTracks, resetVisibleTracks } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    totalTracks: state.ui.totalLikedTracks,
    visibleTrackIds: state.ui.visibleTrackIds
      .sort((trackId1, trackId2) => {return new Date(state.entities.tracks[trackId2].createdAt).getTime()
            - new Date(state.entities.tracks[trackId1].createdAt).getTime();})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestLikedTracks: (num, offset, query) => dispatch(requestLikedTracks(num,offset,query)),
    changeWaitingTracks: (value) => dispatch(changeWaitingTracks(value)),
    resetVisibleTracks: () => dispatch(resetVisibleTracks())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
