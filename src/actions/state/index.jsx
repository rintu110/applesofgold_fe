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

export const viewState = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/state/view_state",
        body,
        "Can't view state right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addState = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      state_nm: payload.stateName,
      code: payload.stateCode,
    };

    const schema = yup.object({
      stateName: yup.string().trim().required("Please enter a state name."),
      stateCode: yup.string().trim().required("Please enter a state code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/state/add_state",
            body,
            "Can't add state right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewState(token, universal));
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

export const updateState = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      state_nm: payload.stateName,
      code: payload.stateCode,
      state_id: payload.stateId,
    };

    const schema = yup.object({
      stateName: yup.string().trim().required("Please enter a state name."),
      stateCode: yup.string().trim().required("Please enter a state code"),
      stateId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid state id!")
        .required("Please enter a state code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/state/edit_state",
            body,
            "Can't update state right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewState(token, universal));
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

export const deleteState = (token, stateId, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      state_id: stateId,
    };

    const schema = yup.object({
      stateId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid state id!")
        .required("Please enter a state code"),
    });

    schema
      .validate({ stateId })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/state/delete_state",
            body,
            "Can't delete state right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewState(token, universal));
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

export const assignedState = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/state/assigned_state",
              { user_token: token, state_id: universal.assignUnassignedStore },
              "Can't assign state right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewState(token, universal));
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

export const unassignedState = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/state/unassigned_state",
              { user_token: token, state_id: universal.assignUnassignedStore },
              "Can't view unassign right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewState(token, universal));
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
              "admin/api/state/add_state_from_csv",
              formdata,
              "Can't upload state right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(setAssignedUnassignedStore([]));
                  dispatch(viewState(token, universal));
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
        "admin/api/state/export_state_to_csv",
        {
          user_token: token,
        },
        "Can't export state right now please try again later",
        "state",
        ".csv"
      )
    );
  };
};
