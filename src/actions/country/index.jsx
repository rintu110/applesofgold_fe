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

export const viewCountry = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/country/view_country",
        body,
        "Can't view country right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addCountry = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      country_nm: payload.countryName,
      code: payload.countryCode,
    };

    const schema = yup.object({
      countryName: yup.string().trim().required("Please enter a country name."),
      countryCode: yup.string().trim().required("Please enter a country code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/country/add_country",
            body,
            "Can't add country right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(setAssignedUnassignedStore([]));
                callBack(true);
                dispatch(viewCountry(token, universal));
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

export const assignedCountry = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/country/assigned_country",
              {
                user_token: token,
                country_id: universal.assignUnassignedStore,
              },
              "Can't assign country right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewCountry(token, universal));
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

export const unassignedCountry = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/country/unassigned_country",
              {
                user_token: token,
                country_id: universal.assignUnassignedStore,
              },
              "Can't unassign country right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewCountry(token, universal));
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

export const updateCountry = (token, payload, universal, callBack) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      country_nm: payload.countryName,
      code: payload.countryCode,
      country_id: payload.countryId,
    };

    const schema = yup.object({
      countryName: yup.string().trim().required("Please enter a country name."),
      countryCode: yup.string().trim().required("Please enter a country code"),
      countryId: yup
        .string()
        .trim()
        .matches(schemaValid.OBJECT_ID, "Invalid country id!")
        .required("Please enter a country id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        dispatch(
          ApiAction(
            "admin/api/country/edit_country",
            body,
            "Can't update country right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(setAssignedUnassignedStore([]));
                callBack(true);
                dispatch(viewCountry(token, universal));
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
              "admin/api/country/add_country_from_csv",
              formdata,
              "Can't upload country right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(setAssignedUnassignedStore([]));
                  dispatch(viewCountry(token, universal));
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
        "admin/api/country/export_country_to_csv",
        {
          user_token: token,
        },
        "Can't export country right now please try again later",
        "country",
        ".csv"
      )
    );
  };
};
