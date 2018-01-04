import { connect } from 'react-redux';
import { logOut } from '../../actions/session_actions';
import GeneralNav from './general_nav';

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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNav);
