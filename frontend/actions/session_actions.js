import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveSessionErrors = (sessionErrors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    sessionErrors
  };
};

export const signUp = (user) => (dispatch) => {
  return SessionAPIUtil.signUp(user)
    .then((res) => dispatch(receiveCurrentUser(res)),
      (err) => dispatch(receiveSessionErrors(err.responseJSON)));
};

export const logIn = (user) => (dispatch) => {
  return SessionAPIUtil.logIn(user)
    .then((res) => dispatch(receiveCurrentUser(res)),
      (err) => dispatch(receiveSessionErrors(err.responseJSON)));
};

export const logOut = () => (dispatch) => {
  return SessionAPIUtil.logOut()
    .then(() => dispatch(receiveCurrentUser(null)),
      (err) => dispatch(receiveSessionErrors(err.responseJSON)));
};
