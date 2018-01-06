import { connect } from 'react-redux';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
  return {
    users: [], //to be replace by state.session.users in array form
    currentUser: state.session.currentUser,
    pageUserId: parseInt(ownProps.match.params.userId),
    isCurrentUserPage: state.session.currentUser.id === parseInt(ownProps.match.params.userId)
  };
};

const mapDispatchToProps = (Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserShow);
