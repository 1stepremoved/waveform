export const CHANGE_NAV = "CHANGE_NAV";
export const CHANGE_MENU = "CHANGE_MENU";
export const CHANGE_FORM = "CHANGE_FORM";
export const CLEAR_SEARCH_TRACKS = "CLEAR_SEARCH_TRACKS";

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
