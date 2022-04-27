import * as constant from "constants/assignCatPrd";
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
import * as schemaConst from "constants/schema";
import { assignUnassignSchema, csvSchema } from "@/schema/universal";

export const setAssignCatId = (payload) => ({
  type: constant.SET_ASSIGN_CAT_ID,
  payload: payload,
});

export const setAssignPrdId = (payload) => ({
  type: constant.SET_ASSIGN_PRD_ID,
  payload: payload,
});

export const setEditAssignCatPrd = (payload) => ({
  type: constant.SET_EDIT_ASSIGN_CAT_PRD,
  payload: payload,
});

export const resetCatPrd = () => ({
  type: constant.RESET_CAT_PRD,
});

export const viewAssignCatPrd = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/assign_cat_prd/view_assign_cat_prd",
        body,
        "Can't view assign category and product right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addAssignCatPrd = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      prdId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one product for assign!"),
      catId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one category for assign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prd_id: payload.prdId,
          cat_id: payload.catId,
        };

        dispatch(
          ApiAction(
            "admin/api/assign_cat_prd/add_assign_cat_prd",
            body,
            "Can't add assign category and product right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetCatPrd());
                dispatch(viewAssignCatPrd(token, universal));
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

export const updateAssignCatPrd = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      prdId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one product for assign!"),
      catId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one category for assign!"),
      assignId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please use a valid assign _id!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prd_id: payload.prdId,
          cat_id: payload.catId,
          assign_id: payload.assignId,
        };

        dispatch(
          ApiAction(
            "admin/api/assign_cat_prd/edit_assign_cat_prd",
            body,
            "Can't update assign category and product right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetCatPrd());
                dispatch(viewAssignCatPrd(token, universal));
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

export const assignedCatPrd = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/assign_cat_prd/assigned_assign_cat_prd",
              { user_token: token, _id: universal.assignUnassignedStore },
              "Can't assigned category and product right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewAssignCatPrd(token, universal));
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

export const unassignedCatPrd = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/assign_cat_prd/unassigned_assign_cat_prd",
              { user_token: token, _id: universal.assignUnassignedStore },
              "Can't unassigned category and product right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewAssignCatPrd(token, universal));
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
              "admin/api/assign_cat_prd/add_assign_cat_prd_from_csv",
              formdata,
              "Can't upload assign category and product right now please try again later",
              (status, message, result, total) => {
                if (status) {
                  dispatch(viewAssignCatPrd(token, universal));
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
        "admin/api/assign_cat_prd/send_assign_cat_prd_from_csv",
        {
          user_token: token,
        },
        "Can't export  assign category and product right now please try again later",
        "assign_cat_prd",
        ".csv"
      )
    );
  };
};
