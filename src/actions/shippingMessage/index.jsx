import {
  setSnackBar,
  setDataStore,
  setTotal,
  setAssignedUnassignedStore,
  ApiAction,
  ApiFileAction,
  ApiFileDownLoadAction,
} from "actions/universal";
import * as yup from "yup";
import * as schemaValid from "constants/schema";
import { assignUnassignSchema, csvSchema } from "@/schema/universal";

export const viewShippingMessage = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/shipping_message/view_shipping_message",
        body,
        "Can't view shipping message right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addShippingMessage = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      shipping_message: payload.shippingMessage,
      code: payload.shippingCode,
      shipping_free: payload.shippingFree,
      shipping_days: payload.shippingDays,
      shipping_order: payload.shippingOrder,
      country_message: payload.countryMessage,
      country_flag: payload.countryFlag,
    };

    const schema = yup.object({
      shippingMessage: yup
        .string()
        .trim()
        .required("Please enter a shipping message."),
      shippingCode: yup
        .string()
        .trim()
        .required("Please enter a shipping code"),
      shippingFree: yup
        .string()
        .trim()
        .required("Please enter a shipping free"),
      shippingDays: yup
        .number()
        .min(1)
        .required("Please enter a shipping days"),
      shippingOrder: yup
        .string()
        .trim()
        .required("Please enter a shipping order"),
      countryMessage: yup.string().trim(),
      countryFlag: yup.string().trim().url(),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/shipping_message/add_shipping_message",
            body,
            "Can't add shipping message right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewShippingMessage(token, universal));
              } else {
                callBack(false);
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

export const updateShippingMessage = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      shipping_message: payload.shippingMessage,
      code: payload.shippingCode,
      shipping_free: payload.shippingFree,
      shipping_days: payload.shippingDays,
      shipping_id: payload.shippingId,
      shipping_order: payload.shippingOrder,
      country_message: payload.countryMessage,
      country_flag: payload.countryFlag,
    };

    const schema = yup.object({
      shippingMessage: yup
        .string()
        .trim()
        .required("Please enter a shipping message."),
      shippingCode: yup
        .string()
        .trim()
        .required("Please enter a shipping code"),
      shippingFree: yup
        .string()
        .trim()
        .required("Please enter a shipping free"),
      shippingDays: yup
        .number()
        .min(1)
        .required("Please enter a shipping days"),
      shippingId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid country id!")
        .required("Please enter a shipping id"),
      shippingOrder: yup
        .string()
        .trim()
        .required("Please enter a shipping order"),
      countryMessage: yup.string().trim(),
      countryFlag: yup.string().trim().url(),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/shipping_message/edit_shipping_message",
            body,
            "Can't update shipping message right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewShippingMessage(token, universal));
              } else {
                callBack(false);
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

export const deleteShippingMessage = (token, _id, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      shipping_id: _id,
    };

    const schema = yup.object({
      _id: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid country id!")
        .required("Please enter a shipping id"),
    });

    schema
      .validate({ _id })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/shipping_message/delete_shipping_message",
            body,
            "Can't delete shipping message right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewShippingMessage(token, universal));
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

export const assignedShippingMessage = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/shipping_message/assigned_shipping_message",
              {
                user_token: token,
                _id: universal.assignUnassignedStore,
              },
              "Can't assign shipping message right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewShippingMessage(token, universal));
                }
                dispatch(setAssignedUnassignedStore([]));
              }
            )
          );
        }
      })
    );
  };
};

export const unassignedShippingMessage = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/shipping_message/unassigned_shipping_message",
              {
                user_token: token,
                _id: universal.assignUnassignedStore,
              },
              "Can't unassign shipping message right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewShippingMessage(token, universal));
                }
                dispatch(setAssignedUnassignedStore([]));
              }
            )
          );
        }
      })
    );
  };
};

export const uploadCSV = (token, csv, universal) => {
  return (dispatch) => {
    var formdata = new FormData();

    formdata.append("user_token", token);

    formdata.append("csv", csv);

    dispatch(
      csvSchema(csv, (csvstatus) => {
        if (csvstatus) {
          dispatch(
            ApiFileAction(
              "admin/api/shipping_message/add_shipping_message_from_csv",
              formdata,
              "Can't upload shipping message right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewShippingMessage(token, universal));
                }
              }
            )
          );
        }
      })
    );
  };
};

export const exportCSV = (token) => {
  return (dispatch) => {
    dispatch(
      ApiFileDownLoadAction(
        "admin/api/shipping_message/send_shipping_message_from_csv",
        {
          user_token: token,
        },
        "Can't export shipping message right now please try again later",
        "shipping_message",
        ".csv"
      )
    );
  };
};
