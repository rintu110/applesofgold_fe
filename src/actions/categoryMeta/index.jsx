import { resetMeta } from "actions/meta";
import {
  setSnackBar,
  setDataStore,
  setTotal,
  ApiAction,
  ApiFileAction,
  ApiFileDownLoadAction,
} from "actions/universal";
import { csvSchema } from "@/schema/universal";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const viewMeta = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/category_meta/view_category_meta",
        body,
        "Can't view category meta right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addMeta = (token, payload, universal) => {
  return (dispatch) => {
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
        let body = {
          user_token: token,
          cat_id: payload.metaForeignId,
          meta_keyword: payload.metaKeyword,
          meta_desc: payload.metaDesc,
          meta_title: payload.metaTitle,
          meta_content: payload.metaContent,
        };

        dispatch(
          ApiAction(
            "admin/api/category_meta/add_category_meta",
            body,
            "Can't add category meta right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(resetMeta());
                dispatch(viewMeta(token, universal));
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

export const updateMeta = (token, payload, universal) => {
  return (dispatch) => {
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
        let body = {
          user_token: token,
          cat_id: payload.metaForeignId,
          meta_keyword: payload.metaKeyword,
          meta_desc: payload.metaDesc,
          meta_title: payload.metaTitle,
          meta_id: payload.metaId,
          meta_content: payload.metaContent,
        };

        dispatch(
          ApiAction(
            "admin/api/category_meta/edit_category_meta",
            body,
            "Can't update category meta right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(resetMeta());
                dispatch(viewMeta(token, universal));
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
    var formdata = new FormData();

    formdata.append("user_token", token);

    formdata.append("csv", csv);

    dispatch(
      csvSchema(csv, (csvstatus) => {
        if (csvstatus) {
          dispatch(
            ApiFileAction(
              "admin/api/category_meta/add_meta_from_csv",
              formdata,
              "Can't upload category meta right now please try again later",
              (status, message, result, total) => {
                if (status) {
                  dispatch(viewMeta(token, universal));
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
        "admin/api/category_meta/export_meta_to_csv",
        {
          user_token: token,
        },
        "Can't export category meta right now please try again later",
        "category_meta",
        ".csv"
      )
    );
  };
};
