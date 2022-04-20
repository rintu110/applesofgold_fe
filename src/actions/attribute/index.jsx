import * as constant from "constants/attribute";
import {
  setLoader,
  setSnackBar,
  unsetLoader,
  setDataStore,
  setTotal,
} from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";

export const setAttributePrompt = (payload) => ({
  type: constant.SET_ATTRIBUTE_PROMPT,
  payload: payload,
});

export const setAttributeCode = (payload) => ({
  type: constant.SET_ATTRIBUTE_CODE,
  payload: payload,
});

export const setAttributeEdit = (payload) => ({
  type: constant.SET_EDIT_ATTRIBUTE,
  payload: payload,
});

export const resetAttribute = () => ({
  type: constant.RESET_ATTRIBUTE_DATA,
});

export const setAttributeLabel = (payload) => ({
  type: constant.SET_ATTRIBUTE_LABEL,
  payload: payload,
});

export const setAttributeImage = (payload) => ({
  type: constant.SET_ATTRIBUTE_IMAGE,
  payload: payload,
});

export const setAttributeType = (payload) => ({
  type: constant.SET_ATTRIBUTE_TYPE,
  payload: payload,
});

export const viewAttribute = (token, universal) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/attributes/view_attributes", {
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
    })
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
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't view attributes right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addAttribute = (token, payload, universal) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter a attribute name."),
      code: yup.string().trim().required("Please enter a attribute code"),
      image: yup
        .string()
        .trim()
        .url()
        .required("Please enter you attribute image"),
      type: yup
        .string()
        .trim()
        .oneOf([
          "checkBox",
          "radioButton",
          "dropdownList",
          "textBox",
          "textArea",
        ])
        .required("Please select your attribute type"),
      label: yup.string().trim().required("Please enter your attribute label"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/attributes/add_attributes",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              prompt: payload.prompt,
              code: payload.code,
              image: payload.image,
              attr_type: payload.type,
              label: payload.label,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetAttribute());
              dispatch(viewAttribute(token, universal));
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
                  "Can't add attributes right now please try again later",
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

export const updateAttribute = (token, payload, universal) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter a attribute name."),
      code: yup.string().trim().required("Please enter a attribute code"),
      attributeId: yup
        .string()
        .trim()
        .matches(
          /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
          "Invalid attribute id!"
        )
        .required("Please enter a attribute _id"),
      image: yup
        .string()
        .trim()
        .url()
        .required("Please enter you attribute image"),
      type: yup
        .string()
        .trim()
        .oneOf([
          "checkBox",
          "radioButton",
          "dropdownList",
          "textBox",
          "textArea",
        ])
        .required("Please select your attribute type"),
      label: yup.string().trim().required("Please enter your attribute label"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/attributes/edit_attributes",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              prompt: payload.prompt,
              code: payload.code,
              attribute_id: payload.attributeId,
              image: payload.image,
              attr_type: payload.type,
              label: payload.label,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetAttribute());
              dispatch(viewAttribute(token, universal));
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
                  "Can't update attributes right now please try again later",
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
          UNIVERSAL.BASEURL + "admin/api/attributes/add_attributes_from_csv",
          {
            method: "POST",
            body: formdata,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetAttribute());
              dispatch(viewAttribute(token, universal));
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
                  "Can't upload attributes right now please try again later",
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
      UNIVERSAL.BASEURL + "admin/api/attributes/send_attributes_from_csv",
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
        link.download = `attributes_${new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't export attributes right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
