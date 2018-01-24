import { connect } from 'react-redux';
import UserShow from './user_show';
import { updateUser } from '../../actions/session_actions';
import { requestUser } from '../../actions/user_actions';
import { changeWaitingTracks, resetVisibleTracks } from '../../actions/ui_actions';
import { requestUsersTracks } from '../../actions/track_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    users: [], //to be replaced by state.session.users in array form
    currentUser: state.session.currentUser,
    pageUserId: parseInt(ownProps.match.params.userId),
    pageUser: state.entities.users[ownProps.match.params.userId],
    isCurrentUserPage: (state.session.currentUser &&
                      state.session.currentUser.id === parseInt(ownProps.match.params.userId)),
    // tracks: state.ui.visibleTrackIds.map(trackId => {
    //   return state.entities.tracks[trackId];
    // })
    waitingForTracks: state.ui.waitingForTracks,
    visibleTrackIds: state.ui.visibleTrackIds
      .sort((trackId1, trackId2) => {return new Date(state.entities.tracks[trackId2].createdAt).getTime()
            - new Date(state.entities.tracks[trackId1].createdAt).getTime();})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (formData, id) => dispatch(updateUser(formData, id)),
    requestUsersTracks: (id, num=10, offset=0, query="") => dispatch(requestUsersTracks(id, num, offset, query)),
    requestUser: (id) => dispatch(requestUser(id)),
    changeWaitingTracks: (value) => dispatch(changeWaitingTracks(value)),
    resetVisibleTracks: () => dispatch(resetVisibleTracks())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserShow);
