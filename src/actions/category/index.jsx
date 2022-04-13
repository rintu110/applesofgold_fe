import * as constant from "constants/category";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const setAllCategoryStore = (payload) => ({
  type: constant.SET_ALL_CATEGORY,
  payload: payload,
});

export const viewAllCategory = (token, searchKeyWord) => {
  return (dispatch) => {
    return fetch(UNIVERSAL.BASEURL + "admin/api/view_all_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
        searchKeyWord: searchKeyWord
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setAllCategoryStore(responseJson.result));
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
            message: "Can't view all category right now please try again later",
          })
        );
      })
  };
};

export const setCategoryStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_STARTING_AFTER, payload: startingAfter });
    payload.statingAfter = startingAfter;
    dispatch(viewCategory(token, payload));
  };
};

export const setCategoryLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_CATEGORY_LIMIT, payload: limit });
    dispatch({ type: constant.SET_STARTING_AFTER, payload: 0 });
    payload.limit = limit;
    dispatch(viewCategory(token, payload));
  };
};

export const setCategoryName = (payload) => ({
  type: constant.SET_CATEGORY_NAME,
  payload: payload,
});

export const setCategoryCode = (payload) => ({
  type: constant.SET_CATEGORY_CODE,
  payload: payload,
});

export const setCategoryContent = (payload) => ({
  type: constant.SET_CATEGORY_CONTENT,
  payload: payload,
});

export const setCategoryParentId = (payload) => ({
  type: constant.SET_CATEGORY_PARENT_ID,
  payload: payload,
});

export const setCategoryKeyWord = (payload) => ({
  type: constant.SET_CATEGORY_KEYWORD,
  payload: payload,
});

export const setCategoryStore = (payload) => ({
  type: constant.SET_CATEGORY_STORE,
  payload: payload,
});

export const setTotalCategory = (payload) => ({
  type: constant.SET_TOTAL_CATEGORY,
  payload: payload,
});

export const setAssignUnassignCategory = (payload) => ({
  type: constant.SET_ASSIGNED_UNASSIGNED_CATEGORY,
  payload: payload,
});

export const resetCategory = () => ({
  type: constant.RESET_CATEGORY,
});

export const setEditCategory = (payload) => ({
  type: constant.SET_EDIT_CATEGORY,
  payload: payload,
});

export const viewCategory = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/view_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
        limit: payload.limit,
        startingAfter: payload.statingAfter,
        searchKeyWord: payload.categoryKeyWord,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setCategoryStore(responseJson.result));
          dispatch(setTotalCategory(responseJson.total));
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
            message: "Can't view category right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addCategory = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      categoryName: yup
        .string()
        .trim()
        .required("Please enter a category name!"),
      categoryCode: yup
        .string()
        .trim()
        .required("Please enter a category code!"),
      categoryContent: yup
        .string()
        .trim()
        .required("Please enter a category content!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/add_category", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            category_nm: payload.categoryName,
            code: payload.categoryCode,
            page_content: payload.categoryContent,
            parent_id: payload.categoryParentId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCategory());
              dispatch(viewCategory(token, payload));
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
                message: "Can't add category right now please try again later",
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

export const updateCategory = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      categoryName: yup
        .string()
        .trim()
        .required("Please enter a category name!"),
      categoryCode: yup
        .string()
        .trim()
        .required("Please enter a category code!"),
      categoryContent: yup
        .string()
        .trim()
        .required("Please enter a category content!"),
      categoryID: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category id!")
        .required("Please enter a category id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/edit_category", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            category_nm: payload.categoryName,
            code: payload.categoryCode,
            page_content: payload.categoryContent,
            parent_id: payload.categoryParentId,
            category_id: payload.categoryID,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCategory());
              dispatch(viewCategory(token, payload));
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
                  "Can't update category right now please try again later",
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

export const assignedCategory = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      categoryAssign: yup
        .array()
        .min(1, "Please select at least one category!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Invalid category _id !")
        )
        .required("Please select at least one category!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/assigned_category", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            category_id: payload.categoryAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCategory());
              dispatch(viewCategory(token, payload));
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
                  "Can't assign category right now please try again later",
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

export const unassignedCategory = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      categoryAssign: yup
        .array()
        .min(1, "Please select at least one category!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Invalid category _id !")
        )
        .required("Please select at least one category!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/unassigned_category", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            category_id: payload.categoryAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetCategory());
              dispatch(viewCategory(token, payload));
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
                  "Can't unassign category right now please try again later",
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

        return fetch(UNIVERSAL.BASEURL + "admin/api/add_category_from_csv", {
          method: "POST",
          body: formdata,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(viewCategory(token, payload));
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
                  "Can't upload category right now please try again later",
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

    return fetch(UNIVERSAL.BASEURL + "admin/api/export_category_to_csv", {
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
        link.download = `category_${+new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't export category right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
