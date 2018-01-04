import { connect } from "react-redux";
import SessionForm from './session_form';
import {signUp, logIn, receiveSessionErrors} from '../../actions/session_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    loggedIn: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const submitAction = (formType === "login") ? logIn : signUp;
  return {
    submitAction: (user) => dispatch(submitAction(user)),
    addError: (errorMessage) => dispatch(receiveSessionErrors(errorMessage)),
    clearErrors: () => dispatch(receiveSessionErrors([])),
    formType
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
