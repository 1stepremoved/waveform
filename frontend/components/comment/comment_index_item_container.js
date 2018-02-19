import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import { requestUser } from '../../actions/user_actions';
import { deleteComment } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.comment.userId],
    belongsToCU: state.session.currentUser && state.session.currentUser.id === ownProps.comment.userId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestUser: (id) => dispatch(requestUser(id)),
    deleteComment: (trackId = ownProps.match.params.trackId, commentId = ownProps.comment.id) => dispatch(deleteComment(trackId, commentId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem));
