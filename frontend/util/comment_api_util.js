export const requestComments = (userId, offset=0, limit=10) => {
  return $.ajax({
    method: "get",
    url: `api/tracks/${userId}/comments`
  });
};


export const createComment = (comment, userId) => {
  return $.ajax({
    method: "post",
    url: `api/tracks/${userId}/comments`,
    dataType: 'json',
    data: {comment}
  });
};
