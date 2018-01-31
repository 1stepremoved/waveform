export const requestTracks = (num=12, offset=0, query="") => {
  return $.ajax({
    method: "get",
    url: `api/tracks?query=${query}&&offset=${offset}&&num=${num}`
  });
};

export const requestLikedTracks = (num=12, offset=0, query="") => {
  return $.ajax({
    method: "get",
    url: `api/tracks?query=${query}&&offset=${offset}&&num=${num}&&liked=true`
  });
};

export const requestUsersTracks = (id, num=12, offset=0, query="") => {
  return $.ajax({
    method: "get",
    url: `api/users/${id}/tracks?query=${query}&&offset=${offset}&&num=${num}`
  });
};

export const requestTrack = (id) => {
  return $.ajax({
    method: "get",
    url: `api/tracks/${id}`
  });
};

export const createTrack = (formData) => {
  return $.ajax({
    method: 'post',
    url: `api/tracks`,
    dataType: 'json',
    contentType: false,
    processData: false,
    data: formData
  });
};

export const updateTrack = (formData, id) => {
  return $.ajax({
    method: 'put',
    url: `api/tracks/${id}`,
    dataType: 'json',
    contentType: false,
    processData: false,
    data: formData
  });
};

export const deleteTrack = (id) => {
  return $.ajax({
    method: "delete",
    url: `api/tracks/${id}`
  });
};
