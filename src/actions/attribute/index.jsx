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
import {
  assignUnassignSchema,
  csvSchema,
  deleteSchema,
} from "@/schema/universal";

// export const viewAllAttribute = (token, event) => {
//   return (dispatch) => {
//     dispatch(
//       ApiSearchAction(
//         "admin/api/attributes/view_all_attributes",
//         {
//           user_token: token,
//           searchKeyWord: event,
//         },
//         "Can't view attributes right now please try again later!",
//         (status, message, result) => {
//           dispatch({
//             type: constant.SET_ALL_ATTRIBUTES,
//             payload: result,
//           });
//         }
//       )
//     );
//   };
// };

export const addAttributeOption = (token, universal, payload, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      attrOptions: yup
        .array()
        .min(1)
        .of(
          yup.object({
            prompt: yup
              .string()
              .trim()
              .required("Please enter a attribute option name."),
            code: yup
              .string()
              .trim()
              .required("Please enter a attribute option code."),
            price: yup
              .string()
              .trim()
              .required("Please enter a attribute option price."),
            defaults: yup
              .boolean()
              .oneOf([true, false])
              .required("Please enter a attribute option default"),
          })
        )
        .required("Please add a attribute option"),
    });

    schema
      .validate({ attrOptions: payload.attrOptions })
      .then(() => {
        let body = {
          user_token: token,
          attr_id: payload.attributeId,
          attr_options: payload.attrOptions,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes/crud_attributes_options",
            body,
            "Please try again later...",
            (status, message, result) => {
              if (status) {
                dispatch(viewAttribute(token, universal));
                callBack(true);
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
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
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
        }
      })
    );
  };
};

export const unassignAttribute = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
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
        }
      })
    );
  };
};

export const addAttribute = (token, payload, universal, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      prompt: yup.string().trim().required("Please enter a attribute name."),
      code: yup.string().trim().required("Please enter a attribute code"),
      image: yup.string().trim().url(),
      attrType: yup
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
      required: yup
        .boolean()
        .oneOf([true, false])
        .required("Please enter required"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          prompt: payload.prompt,
          code: payload.code,
          image: payload.image,
          attr_type: payload.attrType,
          required: payload.required,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes/add_attributes",
            body,
            "Can't add attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewAttribute(token, universal));
                callBack(true);
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

export const updateAttribute = (token, payload, universal, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      attributeId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid attribute id!")
        .required("Please enter a attribute _id"),
      prompt: yup.string().trim().required("Please enter a attribute name."),
      code: yup.string().trim().required("Please enter a attribute code"),
      image: yup.string().trim().url(),
      attrType: yup
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
      required: yup
        .boolean()
        .oneOf([true, false])
        .required("Please enter required"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          attribute_id: payload.attributeId,
          prompt: payload.prompt,
          code: payload.code,
          image: payload.image,
          attr_type: payload.attrType,
          required: payload.required,
        };

        dispatch(
          ApiAction(
            "admin/api/attributes/edit_attributes",
            body,
            "Can't update attributes right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewAttribute(token, universal));
                callBack(true);
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

export const deleteAttribute = (token, attributeId, universal) => {
  return (dispatch) => {
    dispatch(
      deleteSchema(attributeId, (status) => {
        if (status) {
          dispatch(
            ApiAction(
              "admin/api/attributes/delete_attributes",
              {
                user_token: token,
                attribute_id: attributeId,
              },
              "Can't delete attributes right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewAttribute(token, universal));
                }
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
        }
      })
    );
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
