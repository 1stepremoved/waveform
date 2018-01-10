import { connect } from 'react-redux';
import Player from './player';
import {requestTrack} from '../../actions/track_actions';
import {toggleQueue} from '../../actions/ui_actions';
import {nextSong, lastSong, shuffle, repeat, pause, setPosition, startTrack} from '../../actions/queue_actions';

const mapStateToProps = (state) => {
  return {
    currentId: state.queue.currentId,
    paused: state.queue.paused,
    shuffleValue: state.queue.shuffle,
    repeatValue: state.queue.repeat,
    position: state.queue.position,
    startTrackValue: state.queue.startTrack,
    track: !state.queue.currentId ? null : state.entities.tracks[state.queue.currentId],
    queueVisible: state.ui.queueVisible
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
    setPosition: (pos) => dispatch(setPosition(pos)),
    startTrack: (value) => dispatch(startTrack(value)),
    toggleQueue: () => dispatch(toggleQueue())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);