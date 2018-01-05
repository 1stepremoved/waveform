import { connect } from "react-redux";
import SessionForm from './session_form';
import {signUp, logIn, receiveSessionErrors} from '../../actions/session_actions';
import { changeForm } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    loggedIn: state.session.currentUser,
    formType: state.ui.currentForm
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logIn: (user) => dispatch(logIn(user)),
    signUp: (user) => dispatch(signUp(user)),
    addError: (errorMessage) => dispatch(receiveSessionErrors(errorMessage)),
    clearErrors: () => dispatch(receiveSessionErrors([])),
    changeForm: (formName) => dispatch(changeForm(formName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
