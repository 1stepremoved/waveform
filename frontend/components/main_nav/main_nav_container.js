import { connect } from 'react-redux';
import MainNav from './main_nav';
import { logOut } from '../../actions/session_actions';
import { changeForm } from '../../actions/ui_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    isRoot: ownProps.location.pathname === "/"
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    changeForm: (formName) => dispatch(changeForm(formName))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));
