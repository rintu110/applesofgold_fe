import * as constant from "constants/category";
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
import * as schemaConst from "constants/schema";
import { assignUnassignSchema, csvSchema } from "@/schema/universal";

export const setAllCategoryStore = (payload) => ({
  type: constant.SET_ALL_CATEGORY,
  payload: payload,
});

export const viewAllCategory = (token, searchKeyWord) => {
  return (dispatch) => {
    dispatch(
      ApiSearchAction(
        "admin/api/category/view_all_category",
        {
          user_token: token,
          searchKeyWord: searchKeyWord,
        },
        "Can't view all category right now please try again later",
        (status, message, result) => {
          dispatch(setAllCategoryStore(result));
        }
      )
    );
  };
};

export const setCategoryName = (payload) => ({
  type: constant.SET_CATEGORY_NAME,
  payload: payload,
});

export const setCategoryCode = (payload) => ({
  type: constant.SET_CATEGORY_CODE,
  payload: payload,
});

export const setCategoryContent = (payload) => ({
  type: constant.SET_CATEGORY_CONTENT,
  payload: payload,
});

export const setCategoryParentId = (payload) => ({
  type: constant.SET_CATEGORY_PARENT_ID,
  payload: payload,
});

export const resetCategory = () => ({
  type: constant.RESET_CATEGORY,
});

export const setEditCategory = (payload) => ({
  type: constant.SET_EDIT_CATEGORY,
  payload: payload,
});

export const viewCategory = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/category/view_category",
        body,
        "Can't view category right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addCategory = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      categoryName: yup
        .string()
        .trim()
        .required("Please enter a category name!"),
      categoryCode: yup
        .string()
        .trim()
        .required("Please enter a category code!"),
      categoryContent: yup
        .string()
        .trim()
        .required("Please enter a category content!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          category_nm: payload.categoryName,
          code: payload.categoryCode,
          page_content: payload.categoryContent,
          parent_id: payload.categoryParentId,
        };

        dispatch(
          ApiAction(
            "admin/api/category/add_category",
            body,
            "Can't add category right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetCategory());
                dispatch(viewCategory(token, universal));
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

export const updateCategory = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      categoryName: yup
        .string()
        .trim()
        .required("Please enter a category name!"),
      categoryCode: yup
        .string()
        .trim()
        .required("Please enter a category code!"),
      categoryContent: yup
        .string()
        .trim()
        .required("Please enter a category content!"),
      categoryID: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category id!")
        .required("Please enter a category id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          category_nm: payload.categoryName,
          code: payload.categoryCode,
          page_content: payload.categoryContent,
          parent_id: payload.categoryParentId,
          category_id: payload.categoryID,
        };

        dispatch(
          ApiAction(
            "admin/api/category/edit_category",
            body,
            "Can't update category right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(resetCategory());
                dispatch(viewCategory(token, universal));
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

export const assignedCategory = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/category/assigned_category",
              {
                user_token: token,
                category_id: universal.assignUnassignedStore,
              },
              "Can't assign category right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewCategory(token, universal));
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

export const unassignedCategory = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/category/unassigned_category",
              {
                user_token: token,
                category_id: universal.assignUnassignedStore,
              },
              "Can't unassign category right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewCategory(token, universal));
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
              "admin/api/category/add_category_from_csv",
              formdata,
              "Can't upload category right now please try again later",
              (status, message, result, total) => {
                if (status) {
                  dispatch(viewCategory(token, universal));
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
        "admin/api/category/export_category_to_csv",
        {
          user_token: token,
        },
        "Can't export category right now please try again later",
        "category",
        ".csv"
      )
    );
  };
};
