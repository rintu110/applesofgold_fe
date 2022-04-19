import { resetMeta } from "actions/meta";
import {
  setLoader,
  setSnackBar,
  unsetLoader,
  setDataStore,
  setTotal,
} from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const viewMeta = (token, universal) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(
      UNIVERSAL.BASEURL + "admin/api/category_meta/view_category_meta",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: token,
          startingAfter: universal.startingAfter,
          limit: universal.limit,
          searchKeyWord: universal.searchKeyword,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setDataStore(responseJson.result));
          dispatch(setTotal(responseJson.total));
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

export const addMeta = (token, payload, universal) => {
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
      metaForeignId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category id!")
        .required("Please enter a category id"),
      metaContent: yup.string().trim().required("Please enter a meta content!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/category_meta/add_category_meta",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              cat_id: payload.metaForeignId,
              meta_keyword: payload.metaKeyword,
              meta_desc: payload.metaDesc,
              meta_title: payload.metaTitle,
              meta_content: payload.metaContent,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, universal));
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

export const updateMeta = (token, payload, universal) => {
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
      metaForeignId: yup
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
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/category_meta/edit_category_meta",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              cat_id: payload.metaForeignId,
              meta_keyword: payload.metaKeyword,
              meta_desc: payload.metaDesc,
              meta_title: payload.metaTitle,
              meta_id: payload.metaId,
              meta_content: payload.metaContent,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, universal));
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

export const deleteMeta = (token, payload, universal) => {
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
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/category_meta/delete_category_meta",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              meta_id: payload.metaId,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetMeta());
              dispatch(viewMeta(token, universal));
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

export const uploadCSV = (token, csv, universal) => {
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

        return fetch(
          UNIVERSAL.BASEURL + "admin/api/category_meta/add_meta_from_csv",
          {
            method: "POST",
            body: formdata,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(viewMeta(token, universal));
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

    return fetch(
      UNIVERSAL.BASEURL + "admin/api/category_meta/export_meta_to_csv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: token,
        }),
      }
    )
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
