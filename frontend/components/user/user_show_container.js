import { connect } from 'react-redux';
import UserShow from './user_show';
import { updateUser } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    users: [], //to be replace by state.session.users in array form
    currentUser: state.session.currentUser,
    pageUserId: parseInt(ownProps.match.params.userId),
    isCurrentUserPage: (state.session.currentUser &&
                      state.session.currentUser.id === parseInt(ownProps.match.params.userId))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (formData, id) => dispatch(updateUser(formData, id))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserShow);
