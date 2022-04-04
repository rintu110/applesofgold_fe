import * as constant from "../../constants/state";
import { setLoader, setSnackBar, unsetLoader } from "../universal";
import UNIVERSAL from "../../config";
import * as yup from "yup";

export const setStateStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_STARTING_AFTER, payload: startingAfter });
    dispatch(
      viewState(token, startingAfter, payload.limit, payload.countryKeyWord)
    );
  };
};

export const setStateLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch(
      viewState(token, payload.startingAfter, limit, payload.countryKeyWord)
    );
    dispatch({
      type: constant.SET_STATE_LIMIT,
      payload: limit,
    });
  };
};

export const setStateAssignUnassing = (payload) => ({
  type: constant.SET_ASSIGNED_UNASSIGNED_STATE,
  payload: payload,
});

export const setSearchKeyWord = (payload) => ({
  type: constant.SET_STATE_KEYWORD,
  payload: payload,
});

export const setStateName = (payload) => ({
  type: constant.SET_STATE_NAME,
  payload: payload,
});

export const setStateCode = (payload) => ({
  type: constant.SET_STATE_CODE,
  payload: payload,
});

export const resetStateData = () => ({
  type: constant.RESET_STATE_DATA,
});

export const setStateStore = (payload) => ({
  type: constant.SET_STATE_STORE,
  payload: payload,
});

export const setTotalState = (payload) => ({
  type: constant.SET_TOTAL_STATE,
  payload: payload,
});

export const setEditState = (payload) => ({
  type: constant.SET_EDIT_STATE,
  payload: payload,
});

export const viewState = (token, startingAfter, limit, searchKeyWord) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/view_state", {
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
          dispatch(setStateStore(responseJson.result));
          dispatch(setTotalState(responseJson.total));
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
            message: "Can't view state right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addState = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      stateName: yup.string().trim().required("Please enter a state name."),
      stateCode: yup.string().trim().required("Please enter a state code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/add_state", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            state_nm: payload.stateName,
            code: payload.stateCode,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetStateData());
              dispatch(
                viewState(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.stateKeyWord
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
                message: "Can't view state right now please try again later",
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

export const assignedState = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      stateAssign: yup
        .array()
        .min(1, "Please select at least one state")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid State _id !"
            )
        )
        .required("Please select at least one state!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/assigned_state", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            state_id: payload.stateAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetStateData());
              dispatch(
                viewState(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.stateKeyWord
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
                message: "Can't view state right now please try again later",
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

export const unassignedState = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      stateAssign: yup
        .array()
        .min(1, "Please select at least one state")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid State _id !"
            )
        )
        .required("Please select at least one state!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/unassigned_state", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            state_id: payload.stateAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetStateData());
              dispatch(
                viewState(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.stateKeyWord
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
                message: "Can't view state right now please try again later",
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

export const updateState = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      stateName: yup.string().trim().required("Please enter a state name."),
      stateCode: yup.string().trim().required("Please enter a state code"),
      stateId: yup
        .string()
        .trim()
        .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, "Invalid state id!")
        .required("Please enter a state code"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/edit_state", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            state_nm: payload.stateName,
            code: payload.stateCode,
            state_id: payload.stateId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetStateData());
              dispatch(
                viewState(
                  token,
                  payload.startingAfter,
                  payload.limit,
                  payload.stateKeyWord
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
                message: "Can't update state right now please try again later",
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
