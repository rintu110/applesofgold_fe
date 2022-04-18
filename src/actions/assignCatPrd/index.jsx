import * as constant from "constants/assignCatPrd";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const setAssignCatId = (payload) => ({
  type: constant.SET_ASSIGN_CAT_ID,
  payload: payload,
});

export const setAssignPrdId = (payload) => ({
  type: constant.SET_ASSIGN_PRD_ID,
  payload: payload,
});

export const setAssignCatPrdSearchKeyword = (payload) => ({
  type: constant.SET_ASSIGN_CAT_PRD_SEARCH_KEYWORD,
  payload: payload,
});

export const setAssignCatPrdStore = (payload) => ({
  type: constant.SET_ASSIGN_CAT_PRD_STORE,
  payload: payload,
});

export const setAssignedUnassignedCatPrd = (payload) => ({
  type: constant.SET_ASSIGNED_UNASSIGNED_CAT_PRD,
  payload: payload,
});

export const setEditAssignCatPrd = (payload) => ({
  type: constant.SET_EDIT_ASSIGN_CAT_PRD,
  payload: payload,
});

export const setTotalAssignCatPrd = (payload) => ({
  type: constant.SET_TOTAL_ASSIGN_CAT_PRD,
  payload: payload,
});

export const setAssignStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({
      type: constant.SET_ASSIGN_STARTING_AFTER,
      payload: startingAfter,
    });
    payload.startingAfter = startingAfter;
    dispatch(viewAssignCatPrd(token, payload));
  };
};

export const setAssignLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_ASSIGN_LIMIT, payload: limit });
    dispatch({ type: constant.SET_ASSIGN_STARTING_AFTER, payload: 0 });
    payload.limit = limit;
    dispatch(viewAssignCatPrd(token, payload));
  };
};

export const resetCatPrd = () => ({
  type: constant.RESET_CAT_PRD,
});

export const viewAssignCatPrd = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(
      UNIVERSAL.BASEURL + "admin/api/assign_cat_prd/view_assign_cat_prd",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: token,
          limit: payload.limit,
          startingAfter: payload.startingAfter,
          searchKeyWord: payload.assignCatPrdSearchKeyWord,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setAssignCatPrdStore(responseJson.result));
          dispatch(setTotalAssignCatPrd(responseJson.total));
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
      .catch((e) => {
        console.error(e);
        dispatch(
          setSnackBar({
            status: 500,
            message:
              "Can't view assign category and product right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addAssignCatPrd = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      prdId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one product for assign!"),
      catId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one category for assign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/assign_cat_prd/add_assign_cat_prd",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              prd_id: payload.prdId,
              cat_id: payload.catId,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCatPrd());
              dispatch(viewAssignCatPrd(token, payload));
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
                  "Can't add assign category and product right now please try again later",
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

export const updateAssignCatPrd = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      prdId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one product for assign!"),
      catId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please select at least one category for assign!"),
      assignId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid _id!")
        .required("Please use a valid assign _id!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL + "admin/api/assign_cat_prd/edit_assign_cat_prd",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              prd_id: payload.prdId,
              cat_id: payload.catId,
              assign_id: payload.assignId,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCatPrd());
              dispatch(viewAssignCatPrd(token, payload));
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
                  "Can't update assign category and product right now please try again later",
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

export const assignedCatPrd = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      assignUnAssignStore: yup
        .array()
        .min(1, "Please select at least one assign!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Invalid assign _id !")
        )
        .required("Please select at least one assign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL +
            "admin/api/assign_cat_prd/assigned_assign_cat_prd",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              _id: payload.assignUnAssignStore,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCatPrd());
              dispatch(viewAssignCatPrd(token, payload));
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
                  "Can't assigned category and product right now please try again later",
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

export const unassignedCatPrd = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      assignUnAssignStore: yup
        .array()
        .min(1, "Please select at least one assign!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Invalid assign _id !")
        )
        .required("Please select at least one assign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(
          UNIVERSAL.BASEURL +
            "admin/api/assign_cat_prd/unassigned_assign_cat_prd",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_token: token,
              _id: payload.assignUnAssignStore,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCatPrd());
              dispatch(viewAssignCatPrd(token, payload));
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
                  "Can't unassigned category and product right now please try again later",
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

        return fetch(
          UNIVERSAL.BASEURL +
            "admin/api/assign_cat_prd/add_assign_cat_prd_from_csv",
          {
            method: "POST",
            body: formdata,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(viewAssignCatPrd(token, payload));
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
                  "Can't upload assign category and product right now please try again later",
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

    return fetch(
      UNIVERSAL.BASEURL +
        "admin/api/assign_cat_prd/send_assign_cat_prd_from_csv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: token,
        }),
      }
    )
      .then((response) => response.blob())
      .then((responseJson) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(responseJson);
        link.download = `assign_cat_prd_${new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message:
              "Can't export  assign category and product right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
