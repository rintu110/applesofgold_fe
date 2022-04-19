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

export const setDataStore = (payload) => ({
  type: constant.SET_DATA_STORE,
  payload: payload,
});

export const setStartingAfter = (payload) => ({
  type: constant.SET_STARTING_AFTER,
  payload: payload,
});

export const setLimit = (payload) => ({
  type: constant.SET_LIMIT,
  payload: payload,
});

export const setTotal = (payload) => ({
  type: constant.SET_TOTAL,
  payload: payload,
});

export const resetEverythingUniveral = () => ({
  type: constant.RESET_EVERYTHING,
});

export const setSearchKeyword = (payload) => ({
  type: constant.SET_SEARCH_KEYWORD,
  payload: payload,
});
