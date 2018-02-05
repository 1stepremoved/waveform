import { connect } from 'react-redux';
import {moveCurrentTrack, removeFromQueue, addToQueueEnd, addToQueueNext} from '../../actions/queue_actions';
import {requestTrack} from '../../actions/track_actions';
import QueueItem from './queue_item';

const mapStateToProps = (state, ownProps) => {
  return {
    track: state.entities.tracks[ownProps.trackId],
    currentTrackId: state.queue.currentId,
    currentTrack: state.queue.currentTrack,
    key: ownProps.key
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    moveCurrentTrack: (dir) => dispatch(moveCurrentTrack(dir)),
    removeFromQueue: (id) => dispatch(removeFromQueue(id)),
    addToQueueEnd: (id) => dispatch(addToQueueEnd(id)),
    addToQueueNext: (id) => dispatch(addToQueueNext(id)),
    requestTrack: (id) => dispatch(requestTrack(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueItem);
