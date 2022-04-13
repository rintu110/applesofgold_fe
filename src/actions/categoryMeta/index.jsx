import * as constant from "constants/categoryMeta";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const setMetaStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_STARTING_AFTER, payload: startingAfter });
    payload.startingAfter = startingAfter;
    dispatch(viewMeta(token, payload));
  };
};

export const setMetaLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_META_LIMIT, payload: limit });
    dispatch({ type: constant.SET_STARTING_AFTER, payload: 0 });
    payload.limit = limit;
    dispatch(viewMeta(token, payload));
  };
};

export const setMetaContent = (payload) => ({
  type: constant.SET_META_CONTENT,
  payload: payload,
});

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
      metaContent: yup.string().trim().required("Please enter a meta content!"),
    });

    schema
      .validate({ ...payload, })
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
            meta_content: payload.metaContent,
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
      metaContent: yup.string().trim().required("Please enter a meta content!"),
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
            meta_content: payload.metaContent,
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

export const uploadCSV = (token, csv, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      csv: yup
        .object()
        .nullable()
        .shape({
          name: yup.string().trim().required("Please select one csv file"),
          size: yup
            .number()
            .max(1100000, "file size is too large")
            .required("Please select you csv file"),
        }),
    });

    schema
      .validate({ csv: csv })
      .then(() => {
        var formdata = new FormData();

        formdata.append("user_token", token);

        formdata.append("csv", csv);

        return fetch(UNIVERSAL.BASEURL + "admin/api/add_meta_from_csv", {
          method: "POST",
          body: formdata,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
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
                  "Can't upload category meta right now please try again later",
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

export const exportCSV = (token) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/export_meta_to_csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
      }),
    })
      .then((response) => response.blob())
      .then((responseJson) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(responseJson);
        link.download = `category_meta_${+new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message:
              "Can't export category meta right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
