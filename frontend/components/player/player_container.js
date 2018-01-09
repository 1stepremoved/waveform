import { connect } from 'react-redux';
import Player from './player';
import {requestTrack} from '../../actions/track_actions';
import {nextSong, lastSong, shuffle, repeat, pause, setPosition} from '../../actions/queue_actions';

const mapStateToProps = (state) => {
  return {
    currentId: state.queue.currentId,
    paused: state.queue.paused,
    shuffle: state.queue.shuffle,
    repeat: state.queue.repeat,
    position: state.queue.position,
    track: !state.queue.currentId ? null : state.entities.tracks[state.queue.currentId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestTrack: (id) => dispatch(requestTrack(id)),
    nextSong: () => dispatch(nextSong()),
    lastSong: () => dispatch(lastSong()),
    shuffle: () => dispatch(shuffle()),
    repeat: () => dispatch(repeat()),
    pause: () => dispatch(pause()),
    setPosition: (pos) => dispatch(setPosition(pos))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
