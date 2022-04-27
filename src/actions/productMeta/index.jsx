import { resetMeta } from "actions/meta";
import {
  setSnackBar,
  setDataStore,
  setTotal,
  ApiAction,
  ApiFileAction,
  ApiFileDownLoadAction,
} from "actions/universal";
import * as yup from "yup";
import * as schemaConst from "constants/schema";
import { csvSchema } from "@/schema/universal";

export const viewProductMeta = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/product_meta/view_product_meta",
        body,
        "Can't view product meta right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addProductMeta = (token, payload, universal) => {
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
        .required("Please enter a product id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prd_id: payload.metaForeignId,
          meta_keyword: payload.metaKeyword,
          meta_desc: payload.metaDesc,
          meta_title: payload.metaTitle,
        };

        dispatch(
          ApiAction(
            "admin/api/product_meta/add_product_meta",
            body,
            "Can't add product meta right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(resetMeta());
                dispatch(viewProductMeta(token, universal));
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

export const updateProductMeta = (token, payload, universal) => {
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
        .matches(schemaConst.OBJECT_ID, "Invalid product id!")
        .required("Please enter a product id"),
      metaId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid meta id!")
        .required("Please enter a meta id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prd_id: payload.metaForeignId,
          meta_keyword: payload.metaKeyword,
          meta_desc: payload.metaDesc,
          meta_title: payload.metaTitle,
          meta_id: payload.metaId,
        };

        dispatch(
          ApiAction(
            "admin/api/product_meta/edit_product_meta",
            body,
            "Can't update product meta right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(resetMeta());
                dispatch(viewProductMeta(token, universal));
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
              "admin/api/product_meta/add_product_meta_from_csv",
              formdata,
              "Can't upload product meta right now please try again later",
              (status, message, result, total) => {
                if (status) {
                  dispatch(resetMeta());
                  dispatch(viewProductMeta(token, universal));
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
        "admin/api/product_meta/export_product_meta_to_csv",
        {
          user_token: token,
        },
        "Can't export product meta right now please try again later",
        "product_meta",
        ".csv"
      )
    );
  };
};
