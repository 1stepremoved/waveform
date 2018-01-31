
export const createLike = (like) => {
  return $.ajax({
    method: 'post',
    url: `api/likes`,
    dataType: 'json',
    data: {like}
  });
};

export const deleteLike = (id) => {
  return $.ajax({
    method: "delete",
    url: `api/likes/${id}`
  });
};
