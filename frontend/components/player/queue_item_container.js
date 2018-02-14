import { connect } from 'react-redux';
import {moveCurrentTrack, removeFromQueue, addToQueueEnd,
        addToQueueNext, moveTrack, collapseQueueItem, collapseQueueItemPosition} from '../../actions/queue_actions';
import {requestTrack} from '../../actions/track_actions';
import QueueItem from './queue_item';
import { createLike, deleteLike } from '../../actions/like_actions';

const mapStateToProps = (state, ownProps) => {
  let isLiked = false;
  if (state.session.currentUser && state.session.currentUser.likes && state.session.currentUser.likes[ownProps.trackId]) {
    isLiked = true;
  }
  return {
    track: state.entities.tracks[ownProps.trackId],
    currentUser: state.session.currentUser,
    currentTrackId: state.queue.currentId,
    currentTrack: state.queue.currentTrack,
    placeInQueue: ownProps.placeInQueue,
    collapsedQueueItem: state.queue.collapsedQueueItem,
    collapsedQueueItemPosition: state.queue.collapsedQueueItemPosition,
    collapsed: state.queue.collapsedQueueItem === ownProps.placeInQueue,
    place: ownProps.place,
    isLiked
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveCurrentTrack: (dir) => dispatch(moveCurrentTrack(dir)),
    removeFromQueue: (place) => dispatch(removeFromQueue(place)),
    addToQueueEnd: (id) => dispatch(addToQueueEnd(id)),
    addToQueueNext: (id) => dispatch(addToQueueNext(id)),
    requestTrack: (id) => dispatch(requestTrack(id)),
    createLike: (like) => dispatch(createLike(like)),
    deleteLike: (id) => dispatch(deleteLike(id)),
    moveTrack: (backwards) => dispatch(moveTrack(backwards)),
    collapseQueueItem: (place) => dispatch(collapseQueueItem(place)),
    collapseQueueItemPosition: (position) => dispatch(collapseQueueItemPosition(position))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueItem);
