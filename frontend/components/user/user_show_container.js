import { connect } from 'react-redux';
import UserShow from './user_show';
import { updateUser } from '../../actions/session_actions';
import { requestUser } from '../../actions/user_actions';
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
    visibleTrackIds: state.ui.visibleTrackIds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (formData, id) => dispatch(updateUser(formData, id)),
    requestUsersTracks: (id, num=10, query="", offset=0) => dispatch(requestUsersTracks(id, num, query, offset)),
    requestUser: (id) => dispatch(requestUser(id))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserShow);
