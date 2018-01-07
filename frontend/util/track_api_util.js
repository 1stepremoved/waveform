export const requestTracks = (query = "", offset= 0) => {
  return $.ajax({
    method: "get",
    url: `api/tracks?query=${query}&&offset=${offset}`
  });
};

export const requestTrack = (id) => {
  return $.ajax({
    method: "get",
    url: `api/tracks/${id}`
  });
};

export const deleteTrack = (id) => {
  return $.ajax({
    method: "delete",
    url: `api/tracks/${id}`
  });
};
