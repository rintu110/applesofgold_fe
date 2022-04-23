import * as constant from "constants/attribute";
import {
  setSnackBar,
  setDataStore,
  setTotal,
  setAssignedUnassignedStore,
  ApiAction,
  ApiFileAction,
  ApiFileDownLoadAction,
  ApiSearchAction,
} from "actions/universal";
import * as yup from "yup";
import * as schemaValid from "constants/schema";

export const viewAllAttribute = (token, event) => {
  return (dispatch) => {
    dispatch(
      ApiSearchAction(
        "admin/api/attributes/view_all_attributes",
        {
          user_token: token,
          searchKeyWord: event,
        },
        "Can't view attributes right now please try again later!",
        (status, message, result) => {
          dispatch({
            type: constant.SET_ALL_ATTRIBUTES,
            payload: result,
          });
        }
      )
    );
  };
};

export const setOptionPrice = (payload) => ({
  type: constant.SET_OPTION_PRICE,
  payload: payload,
});

export const setOptionCost = (payload) => ({
  type: constant.SET_OPTION_COST,
  payload: payload,
});

export const setAttributeId = (payload) => ({
  type: constant.SET_ATTRIBUTE_ID,
  payload: payload,
});

export const setEditAttributeOption = (payload) => ({
  type: constant.SET_EDIT_ATTRIBUTE_OPTION,
  payload: payload,
});

export const setAttributeLabelCode = (payload) => ({
  type: constant.SET_ATTRIBUTE_LABEL_CODE,
  payload: payload,
});

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
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/attributes/view_attributes",
        body,
        "Can't view attributes right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const assignAttribute = (token, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      assignUnassignedStore: yup
        .array()
        .min(1, "Please select at least one assign!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaValid.OBJECT_ID, "Invalid assign _id !")
        )
        .required("Please select at least one assign!"),
    });

    schema
      .validate({ ...universal })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/attributes/assigned_attributes",
            { user_token: token, _id: universal.assignUnassignedStore },
            "Can't view assign attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewAttribute(token, universal));
              }
              dispatch(setAssignedUnassignedStore([]));
            }
          )
        );
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      });
  };
};

export const unassignAttribute = (token, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      assignUnassignedStore: yup
        .array()
        .min(1, "Please select at least one assign!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaValid.OBJECT_ID, "Invalid assign _id !")
        )
        .required("Please select at least one assign!"),
    });

    schema
      .validate({ ...universal })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/attributes/unassigned_attributes",
            { user_token: token, _id: universal.assignUnassignedStore },
            "Can't view unassign attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewAttribute(token, universal));
              }
              dispatch(setAssignedUnassignedStore([]));
            }
          )
        );
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      });
  };
};

export const addAttribute = (token, payload, universal) => {
  return (dispatch) => {
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
      labelCode: yup
        .string()
        .trim()
        .required("Please enter your attribute label code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prompt: payload.prompt,
          code: payload.code,
          image: payload.image,
          attr_type: payload.type,
          label: payload.label,
          labelcode: payload.labelCode,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes/add_attributes",
            body,
            "Can't add attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetAttribute());
                dispatch(viewAttribute(token, universal));
              }
            }
          )
        );
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      });
  };
};

export const updateAttribute = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter a attribute name."),
      code: yup.string().trim().required("Please enter a attribute code"),
      attributeId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid attribute id!")
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
      labelCode: yup
        .string()
        .trim()
        .required("Please enter your attribute label code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prompt: payload.prompt,
          code: payload.code,
          attribute_id: payload.attributeId,
          image: payload.image,
          attr_type: payload.type,
          label: payload.label,
          labelcode: payload.labelCode,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes/edit_attributes",
            body,
            "Can't update attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetAttribute());
                dispatch(viewAttribute(token, universal));
              }
            }
          )
        );
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      });
  };
};

export const uploadCSV = (token, csv, universal) => {
  return (dispatch) => {
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

        dispatch(
          ApiFileAction(
            "admin/api/attributes/add_attributes_from_csv",
            formdata,
            "Can't upload attributes right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(resetAttribute());
                dispatch(viewAttribute(token, universal));
              }
            }
          )
        );
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      });
  };
};

export const exportCSV = (token) => {
  return (dispatch) => {
    dispatch(
      ApiFileDownLoadAction(
        "admin/api/attributes/send_attributes_from_csv",
        {
          user_token: token,
        },
        "Can't export attributes right now please try again later",
        "attributes",
        ".csv"
      )
    );
  };
};
