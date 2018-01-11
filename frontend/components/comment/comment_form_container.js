import { connect } from 'react-redux';
import  CommentForm  from './comment_form';
import { createComment } from '../../actions/comment_actions';

const mapStateToProps = (state) => {
  return {
    //pass in commentableId manually
    //pass in commentableType manually
    //pass in whether trackIndexItem or TrackShow manually
    currentlyPlayingId: state.queue.currentId,
    position: state.queue.position,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (comment, userId) => dispatch(createComment(comment, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
