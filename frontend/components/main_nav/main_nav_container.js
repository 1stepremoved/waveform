import { connect } from 'react-redux';
import MainNav from './main_nav';
import { logOut } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));
