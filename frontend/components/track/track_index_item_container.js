import { connect } from 'react-redux';
import TrackIndexItem from './track_index_item';
import { requestTrack } from '../../actions/track_actions';
import { createLike, deleteLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => {
  let isLiked = false;
  if (state.session.currentUser.likes && state.session.currentUser.likes[ownProps.trackId]) {
    isLiked = true;
  }
  return {
    track: state.entities.tracks[ownProps.trackId],
    currentUser: state.session.currentUser,
    isLiked: isLiked
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    request: (id) => dispatch(requestTrack(id)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (id) => dispatch(deleteLike(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackIndexItem);
