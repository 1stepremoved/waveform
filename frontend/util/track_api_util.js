export const requestTracks = (query = "") => {
  return $.ajax({
    method: "get",
    url: `api/tracks?query=${query}`
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
