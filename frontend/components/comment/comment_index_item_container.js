import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';
import { requestUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.comment.userId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUser: (id) => dispatch(requestUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);
