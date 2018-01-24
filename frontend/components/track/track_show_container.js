import { connect } from 'react-redux';
import TrackShow from './track_show';
import { requestTrack } from '../../actions/track_actions';
import { changeWaitingComments } from '../../actions/ui_actions';
import { requestComments, clearComments } from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.match.params.trackId],
    currentUser: state.session.currentUser,
    comments: Object.keys(state.entities.comments).map(commentId => {
      return state.entities.comments[commentId];
    }).sort((obj1, obj2) => {return obj2.created_at.getTime() - obj1.created_at.getTime();}),
    totalComments: state.ui.totalComments,
    waitingForComments: state.ui.waitingForComments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTrack: (id) => dispatch(requestTrack(id)),
    requestComments: (trackId, offset, limit) => dispatch(requestComments(trackId,offset,limit)),
    clearComments: () => dispatch(clearComments()),
    changeWaitingComments: (value) => dispatch(changeWaitingComments(value))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TrackShow);
