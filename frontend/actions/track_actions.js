import * as TrackAPIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACKS_AND_SHOW = "RECEIVE_TRACKS_AND_SHOW";
export const RECEIVE_TRACKS_FOR_SEARCH = "RECEIVE_TRACKS_FOR_SEARCH";
export const RECEIVE_TRACKS_FOR_SPLASH = "RECEIVE_TRACKS_FOR_SPLASH";
export const RECEIVE_TRACKS_AND_RESET = "RECEIVE_TRACKS_AND_RESET";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_TRACK_ERRORS = "RECEIVE_TRACK_ERRORS";
export const CLEAR_TRACK_ERRORS = "CLEAR_TRACK_ERRORS";

export const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
    tracks
  };
};

export const receiveTracksAndShow = tracks => {
  return {
    type: RECEIVE_TRACKS_AND_SHOW,
    tracks
  };
};

export const receiveTracksForSearch = tracks => {
  return {
    type: RECEIVE_TRACKS_FOR_SEARCH,
    tracks
  };
};

export const receiveTracksForSplash = tracks => {
  return {
    type: RECEIVE_TRACKS_FOR_SPLASH,
    tracks
  };
};

export const receiveTracksAndReset = tracks => {
  return {
    type: RECEIVE_TRACKS_AND_RESET,
    tracks
  };
};

export const receiveTrack = track => {
  return {
    type: RECEIVE_TRACK,
    track
  };
};

export const removeTrack = track => {
  return {
    type: REMOVE_TRACK,
    trackId: track.id
  };
};

export const receiveTrackErrors = (trackErrors) => {
  return {
    type: RECEIVE_TRACK_ERRORS,
    trackErrors
  };
};

export const clearTrackErrors = () => {
  return {
    type: CLEAR_TRACK_ERRORS
  };
};

export const requestTracks = (num, query, offset) => dispatch => {
  return TrackAPIUtil.requestTracks(num, query, offset)
    .then((res) => dispatch(receiveTracks(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestTracksForSearch = (num, offset, query) => dispatch => {
  return TrackAPIUtil.requestTracks(num, offset, query)
    .then((res) => dispatch(receiveTracksForSearch(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestTracksForSplash = (num, offset, query) => dispatch => {
  return TrackAPIUtil.requestTracks(num, offset, query)
    .then((res) => dispatch(receiveTracksForSplash(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestUsersTracks = (id, num, query, offset) => dispatch => {
  return TrackAPIUtil.requestUsersTracks(id, num, query, offset)
    .then((res) => dispatch(receiveTracksAndShow(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestTracksAndReset = (num, query, offset) => dispatch => {
  return TrackAPIUtil.requestTracks(num, query, offset)
    .then((res) => dispatch(receiveTracksAndReset(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestTrack = id => dispatch => {
  return TrackAPIUtil.requestTrack(id)
    .then((res) => dispatch(receiveTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const createTrack = formData => dispatch => {
  return TrackAPIUtil.createTrack(formData)
    .then((res) => dispatch(receiveTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const updateTrack = (formData, id) => dispatch => {
  return TrackAPIUtil.updateTrack(formData, id)
    .then((res) => dispatch(receiveTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const deleteTrack = id => dispatch => {
  return TrackAPIUtil.deleteTrack(id)
    .then((res) => dispatch(removeTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};
