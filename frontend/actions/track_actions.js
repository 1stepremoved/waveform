import * as TrackAPIUtil from '../util/track_api_util';

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RECEIVE_TRACK_ERRORS = "RECEIVE_TRACK_ERRORS";

export const receiveTracks = tracks => {
  return {
    type: RECEIVE_TRACKS,
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

export const requestTracks = (query, offset) => dispatch => {
  return TrackAPIUtil.requestTracks(query, offset)
    .then((res) => dispatch(receiveTracks(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const requestTrack = id => dispatch => {
  return TrackAPIUtil.requestTrack(id)
    .then((res) => dispatch(receiveTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};

export const deleteTrack = id => dispatch => {
  return TrackAPIUtil.deleteTrack(id)
    .then((res) => dispatch(removeTrack(res)),
      (err) => dispatch(receiveTrackErrors(err.responseJSON)));
};
