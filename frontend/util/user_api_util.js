export const requestUser = (id) => {
  return $.ajax({
    method: "get",
    url: `api/users/${id}`
  });
};
