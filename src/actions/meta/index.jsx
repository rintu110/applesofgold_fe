import * as constant from "constants/meta";

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

export const setEditMeta = (payload) => ({
  type: constant.SET_EDIT_META,
  payload: payload,
});

export const resetMeta = () => ({
  type: constant.RESET_META,
});

export const setForeginId = (payload) => ({
  type: constant.SET_FOREGIN_ID,
  payload: payload,
});
