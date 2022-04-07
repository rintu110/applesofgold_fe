import * as constant from "../../constants/categoryMeta";
import { setLoader, setSnackBar, unsetLoader } from "../universal";
import UNIVERSAL from "../../config";
import * as yup from "yup";
import * as schemaConst from "../../constants/schema";

export const setMetaTitle = (payload) => ({
  type: constant.SET_META_TITLE,
  payload: payload,
});

export const setMetaDesc = (payload) => ({
  type: constant.SET_META_DESC,
  payload: payload,
});

export const setMetaKeyword = (payload) => ({
  type: constant.SET_META_KEYWORD,
  payload: payload,
});

export const setCategoryId = (payload) => ({
  type: constant.SET_CATEGORY_ID,
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

export const viewMeta = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/view_category_meta", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
        limit: payload.limit,
        startingAfter: payload.startingAfter,
        searchKeyWord: payload.metaSearchKeyword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setMetaStore(responseJson.result));
          dispatch(setTotalMeta(responseJson.total));
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((e) => {
        console.error(e);
        dispatch(
          setSnackBar({
            status: 500,
            message:
              "Can't view category meta right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addMeta = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      metaTitle: yup
        .string()
        .trim()
        .required("Please enter a enter meta title!"),
      metaDesc: yup
        .string()
        .trim()
        .required("Please enter a meta description!"),
      metaKeyword: yup.string().trim().required("Please enter a meta keyword!"),
      metaCategoryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category id!")
        .required("Please enter a category id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/add_category_meta", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            cat_id: payload.metaCategoryId,
            meta_keyword: payload.metaKeyword,
            meta_desc: payload.metaDesc,
            meta_title: payload.metaTitle,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, payload));
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't add category meta right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const updateMeta = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      metaTitle: yup
        .string()
        .trim()
        .required("Please enter a enter meta title!"),
      metaDesc: yup
        .string()
        .trim()
        .required("Please enter a meta description!"),
      metaKeyword: yup.string().trim().required("Please enter a meta keyword!"),
      metaCategoryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category id!")
        .required("Please enter a category id"),
      metaId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid meta id!")
        .required("Please enter a meta id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/edit_category_meta", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            cat_id: payload.metaCategoryId,
            meta_keyword: payload.metaKeyword,
            meta_desc: payload.metaDesc,
            meta_title: payload.metaTitle,
            meta_id: payload.metaId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, payload));
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't update category meta right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const deleteMeta = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      metaId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid meta id!")
        .required("Please enter a meta id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/delete_category_meta", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            meta_id: payload.metaId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, payload));
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't delete category meta right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
