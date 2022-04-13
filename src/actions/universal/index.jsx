import * as constant from "constants/universal";

export const setLoader = (payload) => ({
  type: constant.SET_LOADER,
  payload: payload,
});

export const unsetLoader = (payload) => ({
  type: constant.UNSET_LOADER,
  payload: payload,
});

export const setSnackBar = (payload) => ({
  type: constant.SET_SNACKBAR,
  payload: payload,
});

export const unsetSnackBar = (payload) => ({
  type: constant.UNSET_SNACKBAR,
  payload: payload,
});
