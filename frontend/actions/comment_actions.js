import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const CLEAR_COMMENTS =  "CLEAR_COMMENTS";
export const RECEIVE_COMMENT_ERRORS = "RECEIVE_COMMENT_ERRORS";

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  };
};

export const receiveCommentErrors = (commentErrors) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    commentErrors
  };
};

export const requestComments = (userId, offset, limit) => dispatch => {
  return CommentAPIUtil.requestComments(userId,offset,limit)
    .then((comments) => dispatch(receiveComments(comments)),
          (err) => dispatch(receiveCommentErrors(err.responseJSON)));
};

export const createComment = (comment, trackId) => dispatch => {
  return CommentAPIUtil.createComment(comment, trackId)
    .then((comments) => dispatch(receiveComment(comment)),
          (err) => dispatch(receiveCommentErrors(err.responseJSON)));
};
