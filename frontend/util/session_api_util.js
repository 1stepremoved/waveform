export const signUp = (user) => {
  return $.ajax({
    method: 'post',
    url: "/api/users",
    data: {user}
  });
};

export const logIn = (user) => {
  return $.ajax({
    method: 'post',
    url: "/api/session",
    data: {user}
  });
};


export const logOut = () => {
  return $.ajax({
    method: 'delete',
    url: "/api/session"
  });
};

export const updateUser = (formData, id) => {
  return $.ajax({
    method: 'put',
    url: `api/users/${id}`,
    dataType: 'json',
    contentType: false,
    processData: false,
    data: formData
  });
};
