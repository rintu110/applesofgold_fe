import * as constant from "constants/login";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";

export const setUserDetails = (payload) => ({
  type: constant.SET_USER_DETAILS,
  payload: payload,
});

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoader());

    var date = new Date();
    var time = date.getTime();
    var expireTime = time + 3600 * 1000 * 24 * 365 * 1;
    date.setTime(expireTime);

    return fetch(UNIVERSAL.BASEURL + "api/users/login_users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setUserDetails(responseJson.result));
          document.cookie = `applesofgoldObject=${
            responseJson.result.user_token
          }; expires=${date.toUTCString()}; path=/;`;
          document.cookie = `type=${
            responseJson.result.user_type
          }; expires=${date.toUTCString()}; path=/;`;
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
            message: "Can't login right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const getUserDetails = (token) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "api/users/get_user_details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setUserDetails(responseJson.result));
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
            message: "Can't get user details right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const getServerSideUserDetails = (token, store) =>
  fetch(UNIVERSAL.BASEURL + "api/users/get_user_details", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_token: token,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status) {
        store.dispatch(setUserDetails(responseJson.result));
        store.dispatch(
          setSnackBar({
            status: responseJson.status,
            message: responseJson.message,
          })
        );
      } else {
        store.dispatch(
          setSnackBar({
            status: responseJson.status,
            message: responseJson.message,
          })
        );
      }
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(
        setSnackBar({
          status: 500,
          message: "Can't get user details right now please try again later",
        })
      );
    });
