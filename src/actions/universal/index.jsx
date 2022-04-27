import * as constant from "constants/universal";
import UNIVERSAL from "@/config";

export const setLoader = (payload) => ({
  type: constant.SET_LOADER,
  payload: payload,
});

export const unsetLoader = (payload) => ({
  type: constant.UNSET_LOADER,
  payload: payload,
});

export const setSnackBar = (payload) => ({
  type: constant.SET_SNACKBAR,
  payload: payload,
});

export const unsetSnackBar = (payload) => ({
  type: constant.UNSET_SNACKBAR,
  payload: payload,
});

export const setDataStore = (payload) => ({
  type: constant.SET_DATA_STORE,
  payload: payload,
});

export const setStartingAfter = (payload) => ({
  type: constant.SET_STARTING_AFTER,
  payload: payload,
});

export const setLimit = (payload) => ({
  type: constant.SET_LIMIT,
  payload: payload,
});

export const setTotal = (payload) => ({
  type: constant.SET_TOTAL,
  payload: payload,
});

export const resetEverythingUniveral = () => ({
  type: constant.RESET_EVERYTHING,
});

export const setSearchKeyword = (payload) => ({
  type: constant.SET_SEARCH_KEYWORD,
  payload: payload,
});

export const setAssignedUnassignedStore = (payload) => ({
  type: constant.SET_ASSIGNED_AND_UNASSIGNED_STORE,
  payload: payload,
});

export const ApiAction = (url, body, error, callBack) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          callBack(
            responseJson.status,
            responseJson.message,
            responseJson.result,
            responseJson.total
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
          callBack(responseJson.status, responseJson.message, [], 0);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: error,
          })
        );
        callBack(500, error, [], 0);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const ApiSearchAction = (url, body, error, callBack) => {
  return (dispatch) => {
    return fetch(UNIVERSAL.BASEURL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          callBack(
            responseJson.status,
            responseJson.message,
            responseJson.result
          );
        } else {
          callBack(responseJson.status, responseJson.message, []);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: error,
          })
        );
        callBack(500, error, []);
      });
  };
};

export const ApiFileAction = (url, body, error, callBack) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + url, {
      method: "POST",
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          callBack(
            responseJson.status,
            responseJson.message,
            responseJson.result
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
          callBack(responseJson.status, responseJson.message, []);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: error,
          })
        );
        callBack(500, error, []);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const ApiFileDownLoadAction = (url, body, error, file, format) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.blob())
      .then((responseJson) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(responseJson);
        link.download = `${file}_${new Date()}.${format}`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: error,
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
