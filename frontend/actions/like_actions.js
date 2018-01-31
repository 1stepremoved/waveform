import * as LikeAPIUtil from '../util/like_api_util';

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE_ERRORS = "RECEIVE_LIKE_ERRORS";

export const receiveLikes = (user) => {
  return {
    type: RECEIVE_LIKES,
    user
  };
};


export const receiveLikeErrors = (likeErrors) => {
  return {
    type: RECEIVE_LIKE_ERRORS,
    likeErrors
  };
};

export const createLike = (like) => dispatch => {
  return LikeAPIUtil.createLike(like)
    .then((res) => dispatch(receiveLikes(res)),
          (err) => dispatch(receiveLikeErrors(err.responseJSON)));
};

export const deleteLike = (id) => dispatch => {
  return LikeAPIUtil.deleteLike(id)
    .then((res) => dispatch(receiveLikes(res)),
          (err) => dispatch(receiveLikeErrors(err.responseJSON)));
};
