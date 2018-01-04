export const CHANGE_NAV = "CHANGE_NAV";

export const changeNav = (navName) => {
  return {
    type: CHANGE_NAV,
    navName
  };
};
