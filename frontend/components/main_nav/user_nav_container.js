import { connect } from 'react-redux';
import { changeNav } from '../../actions/ui_actions';
import UserNav from './user_nav';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentNav: state.ui.currentNav
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeNav: (navName) => dispatch(changeNav(navName))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserNav);
