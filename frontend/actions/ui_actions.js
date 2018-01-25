export const CHANGE_NAV = "CHANGE_NAV";
export const CHANGE_MENU = "CHANGE_MENU";
export const CHANGE_FORM = "CHANGE_FORM";
export const CLEAR_SEARCH_TRACKS = "CLEAR_SEARCH_TRACKS";
export const CHANGE_WAITING_TRACKS = "CHANGE_WAITING_TRACKS";
export const RESET_VISIBLE_TRACKS = "RESET_VISIBLE_TRACKS";
export const CHANGE_WAITING_COMMENTS = "CHANGE_WAITING_COMMENTS";
export const RESET_SEARCH = "RESET_SEARCH";

export const changeNav = (navName) => {
  return {
    type: CHANGE_NAV,
    navName
  };
};

export const changeMenu = (menuName) => {
  return {
    type: CHANGE_MENU,
    menuName
  };
};

export const changeForm = (formName) => {
  return {
    type: CHANGE_FORM,
    formName
  };
};


export const clearSearchTracks = () => {
  return {
    type: CLEAR_SEARCH_TRACKS
  };
};

export const changeWaitingTracks = (value) => {
  return {
    type: CHANGE_WAITING_TRACKS,
    value
  };
};

export const changeWaitingComments = (value) => {
  return {
    type: CHANGE_WAITING_COMMENTS,
    value
  };
};

export const resetVisibleTracks = () => {
  return {
    type: RESET_VISIBLE_TRACKS
  };
};

export const resetSearch = (value) => {
  return {
    type: RESET_SEARCH,
    value
  };
};
