import { connect } from 'react-redux';
import TrackShow from './track_show';
import { requestTrack } from '../../actions/track_actions';
import { requestComments, clearComments } from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.match.params.trackId],
    currentUser: state.session.currentUser,
    comments: Object.keys(state.entities.comments).map(commentId => {
      return state.entities.comments[commentId];
    }).sort((obj1, obj2) => {return obj1.createdAtInt > obj2.createdAtInt;}).reverse(),
    totalComments: state.ui.totalComments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTrack: (id) => dispatch(requestTrack(id)),
    requestComments: (trackId, offset, limit) => dispatch(requestComments(trackId,offset,limit)),
    clearComments: () => dispatch(clearComments())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TrackShow);
