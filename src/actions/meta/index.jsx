import * as constant from "constants/meta";

export const setMetaStartingAfter = (
  token,
  payload,
  startingAfter,
  callBack
) => {
  return (dispatch) => {
    dispatch({
      type: constant.SET_META_STARTING_AFTER,
      payload: startingAfter,
    });
    payload.startingAfter = startingAfter;
    callBack;
  };
};

export const setMetaLimit = (token, payload, limit, callBack) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_META_LIMIT, payload: limit });
    dispatch({ type: constant.SET_META_STARTING_AFTER, payload: 0 });
    payload.limit = limit;
    callBack;
  };
};

export const setMetaTitle = (payload) => ({
  type: constant.SET_META_TITLE,
  payload: payload,
});

export const setMetaDesc = (payload) => ({
  type: constant.SET_META_DESC,
  payload: payload,
});

export const setMetaContent = (payload) => ({
  type: constant.SET_META_CONTENT,
  payload: payload,
});

export const setMetaKeyword = (payload) => ({
  type: constant.SET_META_KEYWORD,
  payload: payload,
});

export const setMetaStore = (payload) => ({
  type: constant.SET_META_STORE,
  payload: payload,
});

export const setMetaSearchKeyword = (payload) => ({
  type: constant.SET_META_SEARCH_KEYWORD,
  payload: payload,
});

export const setEditMeta = (payload) => ({
  type: constant.SET_EDIT_META,
  payload: payload,
});

export const setTotalMeta = (payload) => ({
  type: constant.SET_TOTAL_META,
  payload: payload,
});

export const resetMeta = () => ({
  type: constant.RESET_META,
});

export const setForeginId = (payload) => ({
  type: constant.SET_FOREGIN_ID,
  payload: payload,
});

export const resetEverythingMeta = () => ({
  type: constant.RESET_EVERYTHING_META_DATA,
});
