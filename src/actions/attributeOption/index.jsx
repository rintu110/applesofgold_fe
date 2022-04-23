import {
  setDataStore,
  setTotal,
  ApiAction,
  setSnackBar,
  ApiFileAction,
  ApiFileDownLoadAction,
} from "actions/universal";
import { resetAttribute } from "actions/attribute";
import * as schemaValid from "constants/schema";
import * as yup from "yup";

export const viewAttributeOption = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/attributes_option/view_attributes_options",
        body,
        "Can't view attribute option right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addAttributeOption = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter your option prompt"),
      code: yup.string().trim().required("Please enter your option code"),
      image: yup
        .string()
        .trim()
        .url()
        .required("Please enter your option image"),
      price: yup.string().trim().required("Please enter your option price"),
      cost: yup.string().trim().required("Please enter you option cost"),
      attributeId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid attribute")
        .required("Please select your attribute!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prompt: payload.prompt,
          code: payload.code,
          image: payload.image,
          price: payload.price,
          cost: payload.cost,
          attr_id: payload.attributeId,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes_option/add_attributes_options",
            body,
            "Can't add attribute option right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(viewAttributeOption(token, universal));
                dispatch(resetAttribute());
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

export const updateAttributeOption = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter your option prompt"),
      code: yup.string().trim().required("Please enter your option code"),
      image: yup
        .string()
        .trim()
        .url()
        .required("Please enter your option image"),
      price: yup.string().trim().required("Please enter your option price"),
      cost: yup.string().trim().required("Please enter you option cost"),
      attributeId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid attribute")
        .required("Please select your attribute!"),
      optionId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid option")
        .required("Please select your option!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prompt: payload.prompt,
          code: payload.code,
          image: payload.image,
          price: payload.price,
          cost: payload.cost,
          attr_id: payload.attributeId,
          option_id: payload.optionId,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes_option/edit_attributes_options",
            body,
            "Can't update attribute option right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(viewAttributeOption(token, universal));
                dispatch(resetAttribute());
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
            "admin/api/attributes_option/add_attributes_options_from_csv",
            formdata,
            "Can't upload options right now please try again later",
            (status, message, result, total) => {
              if (status) {
                dispatch(viewAttributeOption(token, universal));
                dispatch(resetAttribute());
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
        "admin/api/attributes_option/send_attributes_options_from_csv",
        {
          user_token: token,
        },
        "Can't export attributes options right now please try again later",
        "Attribute_Options",
        ".csv"
      )
    );
  };
};
