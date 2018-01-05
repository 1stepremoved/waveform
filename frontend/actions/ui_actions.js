export const CHANGE_NAV = "CHANGE_NAV";
export const CHANGE_FORM = "CHANGE_FORM";

export const changeNav = (navName) => {
  return {
    type: CHANGE_NAV,
    navName
  };
};

export const changeForm = (formName) => {
  return {
    type: CHANGE_FORM,
    formName
  };
};
