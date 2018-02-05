import { connect } from 'react-redux';
import TrackShow from './track_show';
import { requestTrack } from '../../actions/track_actions';
import { changeWaitingComments } from '../../actions/ui_actions';
import { requestComments, clearComments } from '../../actions/comment_actions';
import { addToQueueEnd, addToQueueNext } from '../../actions/queue_actions';
import { createLike, deleteLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => {
  let isLiked = false;
  if (state.session.currentUser && state.session.currentUser.likes && state.session.currentUser.likes[ownProps.match.params.trackId]) {
    isLiked = true;
  }
  return {
    track: state.entities.tracks[ownProps.match.params.trackId],
    currentUser: state.session.currentUser,
    comments: Object.keys(state.entities.comments).map(commentId => {
      return state.entities.comments[commentId];
    }).sort((obj1, obj2) => {return obj2.created_at.getTime() - obj1.created_at.getTime();}),
    totalComments: state.ui.totalComments,
    waitingForComments: state.ui.waitingForComments,
    isLiked: isLiked
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTrack: (id) => dispatch(requestTrack(id)),
    requestComments: (trackId, offset, limit) => dispatch(requestComments(trackId,offset,limit)),
    clearComments: () => dispatch(clearComments()),
    changeWaitingComments: (value) => dispatch(changeWaitingComments(value)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    addToQueueEnd: (id) => dispatch(addToQueueEnd(id)),
    addToQueueNext: (id) => dispatch(addToQueueNext(id)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(TrackShow);
