
export const ADD_TO_QUEUE_END = "ADD_TO_QUEUE_END";
export const ADD_TO_QUEUE_NOW = "ADD_TO_QUEUE_NOW";
export const ADD_TO_QUEUE_NEXT = "ADD_TO_QUEUE_NEXT";
export const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";
export const NEXT_SONG = "NEXT_SONG";
export const LAST_SONG = "LAST_SONG";
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const SHUFFLE = "SHUFFLE";
export const REPEAT = "REPEAT";
export const PAUSE = "PAUSE";
export const SET_POSITION = "SET_POSITION";
export const START_TRACK = "START_TRACK";
export const MOVE_CURRENT_TRACK = "MOVE_CURRENT_TRACK";

export const addToQueueEnd = (trackId) => {
  return {
    type: ADD_TO_QUEUE_END,
    trackId
  };
};

export const addToQueueNow = (trackId) => {
  return {
    type: ADD_TO_QUEUE_NOW,
    trackId
  };
};

export const addToQueueNext = (trackId) => {
  return {
    type: ADD_TO_QUEUE_NEXT,
    trackId
  };
};

export const removeFromQueue = (trackId) => {
  return {
    type: REMOVE_FROM_QUEUE,
    trackId
  };
};

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE
  };
};

export const nextSong = () => {
  return {
    type: NEXT_SONG
  };
};

export const lastSong = () => {
  return {
    type: LAST_SONG
  };
};

export const shuffle = () => {
  return {
    type: SHUFFLE
  };
};

export const repeat = () => {
  return {
    type: REPEAT
  };
};

export const pause = () => {
  return {
    type: PAUSE
  };
};

export const setPosition = (position) => {
  return {
    type: SET_POSITION,
    position
  };
};

export const startTrack = (value) => {
  return {
    type: START_TRACK,
    value
  };
};

export const moveCurrentTrack = (dir) => {
  return {
    type: MOVE_CURRENT_TRACK,
    dir
  };
};
