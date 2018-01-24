export const requestComments = (userId, offset=0, limit=10) => {
  return $.ajax({
    method: "get",
    url: `api/tracks/${userId}/comments?offset=${offset}&&limit=${limit}`
  });
};


export const createComment = (comment, trackId) => {
  return $.ajax({
    method: "post",
    url: `api/tracks/${trackId}/comments`,
    dataType: 'json',
    data: {comment}
  });
};
