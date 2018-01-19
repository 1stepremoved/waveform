import { connect } from 'react-redux';
import Queue from './queue';
import {requestTrack} from '../../actions/track_actions';
import { changeMenu } from '../../actions/ui_actions';
import { clearQueue } from '../../actions/queue_actions';

const mapStateToProps = (state) => {
  return {
    trackIds: state.queue.trackIds,
    currentId: state.queue.currentId,
    queueVisible: state.ui.queueVisible,
    currentMenu: state.ui.currentMenu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearQueue: () => dispatch(clearQueue()),
    changeMenu: (menuName) => dispatch(changeMenu(menuName))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
