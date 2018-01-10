import { connect } from 'react-redux';
import PlayButton from './play_button';
import { addToQueueNow, pause } from '../../actions/queue_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    paused: state.queue.paused,
    currentlyPlaying: ownProps.track ? (state.queue.currentId === ownProps.track.id) : false,
    currentId: state.queue.currentId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToQueueNow: (id) => dispatch(addToQueueNow(id)),
    pause: () => dispatch(pause())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);