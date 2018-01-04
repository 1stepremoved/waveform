import { connect } from 'react-redux';
import { logOut } from '../../actions/session_actions';
import { changeNav } from '../../actions/ui_actions';
import GeneralNav from './general_nav';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentNav: state.ui.currentNav
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    changeNav: (navName) => dispatch(changeNav(navName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNav);
