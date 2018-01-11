import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const receiveUserErrors = (userErrors) => {
  return {
    type: RECEIVE_USER_ERRORS,
    userErrors
  };
};

export const requestUser = (id)=> (dispatch) => {
  return UserAPIUtil.requestUser(id)
    .then((res) => dispatch(receiveUser(res)),
          (err) => dispatch(receiveUserErrors(err.responseJSON)));
};
