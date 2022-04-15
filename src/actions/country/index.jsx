import * as constant from "constants/country";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";

export const setCountryStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_STARTING_AFTER, payload: startingAfter });
    dispatch(
      viewCountry(token, startingAfter, payload.limit, payload.countryKeyWord)
    );
  };
};

export const setCountryLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch(
      viewCountry(token, payload.startingAfter, limit, payload.countryKeyWord)
    );
    dispatch({
      type: constant.SET_COUNTRY_LIMIT,
      payload: limit,
    });
  };
};

export const setCountryAssignUnassing = (payload) => ({
  type: constant.SET_ASSIGNED_UNASSIGNED_COUNTRY,
  payload: payload,
});

export const setSearchKeyWord = (payload) => ({
  type: constant.SET_COUNTRY_KEYWORD,
  payload: payload,
});

export const setCountryName = (payload) => ({
  type: constant.SET_COUNTRY_NAME,
  payload: payload,
});

export const setCountryCode = (payload) => ({
  type: constant.SET_COUNTRY_CODE,
  payload: payload,
});

export const resetCountryData = () => ({
  type: constant.RESET_COUNTRY_DATA,
});

export const setCountryStore = (payload) => ({
  type: constant.SET_COUNTRY_STORE,
  payload: payload,
});

export const setTotalCountry = (payload) => ({
  type: constant.SET_TOTAL_COUNTRY,
  payload: payload,
});

export const setEditCountry = (payload) => ({
  type: constant.SET_EDIT_COUNTRY,
  payload: payload,
});

export const viewCountry = (token, startingAfter, limit, searchKeyWord) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/view_country", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
        startingAfter: startingAfter,
        limit: limit,
        searchKeyWord: searchKeyWord,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setCountryStore(responseJson.result));
          dispatch(setTotalCountry(responseJson.total));
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't view country right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addCountry = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      countryName: yup.string().trim().required("Please enter a country name."),
      countryCode: yup.string().trim().required("Please enter a country code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/add_country", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            country_nm: payload.countryName,
            code: payload.countryCode,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCountryData());
              dispatch(
                viewCountry(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.countryKeyWord
                )
              );
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message: "Can't add country right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const assignedCountry = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      countryAssign: yup
        .array()
        .min(1, "Please select at least one country")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid Country _id !"
            )
        )
        .required("Please select at least one country!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/assigned_country", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            country_id: payload.countryAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCountryData());
              dispatch(
                viewCountry(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.countryKeyWord
                )
              );
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't assign country right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const unassignedCountry = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      countryAssign: yup
        .array()
        .min(1, "Please select at least one country")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid Country _id !"
            )
        )
        .required("Please select at least one country!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/unassigned_country", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            country_id: payload.countryAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCountryData());
              dispatch(
                viewCountry(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.countryKeyWord
                )
              );
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't unassign country right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const updateCountry = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      countryName: yup.string().trim().required("Please enter a country name."),
      countryCode: yup.string().trim().required("Please enter a country code"),
      countryId: yup
        .string()
        .trim()
        .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, "Invalid country id!")
        .required("Please enter a country id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/edit_country", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            country_nm: payload.countryName,
            code: payload.countryCode,
            country_id: payload.countryId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCountryData());
              dispatch(
                viewCountry(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.countryKeyWord
                )
              );
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't update country right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const uploadCSV = (token, csv, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

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

        return fetch(UNIVERSAL.BASEURL + "admin/api/add_country_from_csv", {
          method: "POST",
          body: formdata,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(
                viewCountry(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.countryKeyWord
                )
              );
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            } else {
              dispatch(
                setSnackBar({
                  status: responseJson.status,
                  message: responseJson.message,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err);
            dispatch(
              setSnackBar({
                status: 500,
                message:
                  "Can't upload country right now please try again later",
              })
            );
          })
          .finally(() => {
            dispatch(unsetLoader());
          });
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const exportCSV = (token) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/export_country_to_csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
      }),
    })
      .then((response) => response.blob())
      .then((responseJson) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(responseJson);
        link.download = `country_${new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't export country right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
