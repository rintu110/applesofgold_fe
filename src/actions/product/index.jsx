import * as constant from "constants/product";
import { setLoader, setSnackBar, unsetLoader } from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";

export const setProductName = (payload) => ({
  type: constant.SET_PRODUCT_NAME,
  payload: payload,
});

export const setProductCode = (payload) => ({
  type: constant.SET_PRODUCT_CODE,
  payload: payload,
});

export const setProductCost = (payload) => ({
  type: constant.SET_PRODUCT_COST,
  payload: payload,
});

export const setProductPrice = (payload) => ({
  type: constant.SET_PRODUCT_PRICE,
  payload: payload,
});

export const setProductWeight = (payload) => ({
  type: constant.SET_PRODUCT_WEIGHT,
  payload: payload,
});

export const setProductDescription = (payload) => ({
  type: constant.SET_PRODUCT_DESCRIPTION,
  payload: payload,
});

export const setProductTaxable = (payload) => ({
  type: constant.SET_PRODUCT_TAXABLE,
  payload: payload,
});

export const setProductCategoryId = (payload) => ({
  type: constant.SET_PRODUCT_CATEGORY_ID,
  payload: payload,
});

export const setProductAssignUnassigned = (payload) => ({
  type: constant.SET_PRODUCT_ASSIGN_UNASSIGNED,
  payload: payload,
});

export const setProductStore = (payload) => ({
  type: constant.SET_PRODUCT_STORE,
  payload: payload,
});

export const setEditProduct = (payload) => ({
  type: constant.SET_EDIT_PRODUCT,
  payload: payload,
});

export const setTotalProduct = (payload) => ({
  type: constant.SET_TOTAL_PRODUCT,
  payload: payload,
});

export const resetProduct = () => ({
  type: constant.RESET_PRODUCT,
});

export const setProductKeyword = (payload) => ({
  type: constant.SET_PRODUCT_KEYWORD,
  payload: payload,
});

export const setAllProduct = (payload) => ({
  type: constant.SET_ALL_PRODUCT,
  payload: payload,
});

export const setProductStartingAfter = (token, payload, startingAfter) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_STARTING_AFTER, payload: startingAfter });
    payload.startingAfter = startingAfter;
    dispatch(viewProduct(token, payload));
  };
};

export const setProductLimit = (token, payload, limit) => {
  return (dispatch) => {
    dispatch({ type: constant.SET_CATEGORY_LIMIT, payload: limit });
    dispatch({ type: constant.SET_STARTING_AFTER, payload: 0 });
    payload.limit = limit;
    dispatch(viewProduct(token, payload));
  };
};

export const viewProduct = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    return fetch(UNIVERSAL.BASEURL + "admin/api/view_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: token,
        limit: payload.limit,
        startingAfter: payload.startingAfter,
        searchKeyWord: payload.productKeyword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(setProductStore(responseJson.result));
          dispatch(setTotalProduct(responseJson.total));
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
            message: "Can't view product right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};

export const addProduct = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      productCategoryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category _id!")
        .required("Please select at least one category!"),
      productName: yup
        .string()
        .trim()
        .required("Please enter your product name!"),
      productCode: yup
        .string()
        .trim()
        .required("Please enter your product code!"),
      productPrice: yup
        .number()
        .nullable()
        .required("Please enter your product price!"),
      productCost: yup
        .number()
        .nullable()
        .required("Please enter your product cost!"),
      productWeight: yup
        .number()
        .nullable()
        .required("Please enter your product weight!"),
      productDescription: yup
        .string()
        .trim()
        .required("Please enter your product description!"),
      productTaxable: yup
        .number()
        .nullable()
        .required("Please enter your product taxable!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/add_product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            cat_id: payload.productCategoryId,
            product_nm: payload.productName,
            price: payload.productPrice,
            weight: payload.productWeight,
            prd_desc: payload.productDescription,
            code: payload.productCode,
            cost: payload.productCost,
            taxable: payload.productTaxable,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetProduct());
              dispatch(viewProduct(token, payload));
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
                message: "Can't add  Product right now please try again later",
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

export const updateProduct = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      productCategoryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid category _id!")
        .required("Please select at least one category!"),
      productName: yup
        .string()
        .trim()
        .required("Please enter your product name!"),
      productCode: yup
        .string()
        .trim()
        .required("Please enter your product code!"),
      productPrice: yup
        .number()
        .nullable()
        .required("Please enter your product price!"),
      productCost: yup
        .number()
        .nullable()
        .required("Please enter your product cost!"),
      productWeight: yup
        .number()
        .nullable()
        .required("Please enter your product weight!"),
      productDescription: yup
        .string()
        .trim()
        .required("Please enter your product description!"),
      productTaxable: yup
        .number()
        .nullable()
        .required("Please enter your product taxable!"),
      productId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Invalid Product _id!")
        .required("Please use your product _id before update the product"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/edit_product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            cat_id: payload.productCategoryId,
            product_nm: payload.productName,
            price: payload.productPrice,
            weight: payload.productWeight,
            prd_desc: payload.productDescription,
            code: payload.productCode,
            cost: payload.productCost,
            taxable: payload.productTaxable,
            product_id: payload.productId,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetProduct());
              dispatch(viewProduct(token, payload));
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
                  "Can't update Product right now please try again later",
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

export const assignProduct = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      productAssign: yup
        .array()
        .min(1, "Please select at least one product")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid product _id !"
            )
        )
        .required("Please select at least one product before assign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/assigned_product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            _id: payload.productAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetProduct());
              dispatch(viewProduct(token, payload));
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
                  "Can't assign product right now please try again later",
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

export const unassignProduct = (token, payload) => {
  return (dispatch) => {
    dispatch(setLoader());

    const schema = yup.object({
      productAssign: yup
        .array()
        .min(1, "Please select at least one product")
        .of(
          yup
            .string()
            .trim()
            .matches(
              /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
              "Invalid product _id !"
            )
        )
        .required("Please select at least one product before unassign!"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        return fetch(UNIVERSAL.BASEURL + "admin/api/unassigned_product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_token: token,
            _id: payload.productAssign,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(resetProduct());
              dispatch(viewProduct(token, payload));
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
                  "Can't unassign product right now please try again later",
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

        return fetch(UNIVERSAL.BASEURL + "admin/api/add_product_from_csv", {
          method: "POST",
          body: formdata,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(viewProduct(token, payload));
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
                  "Can't upload product right now please try again later",
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

    return fetch(UNIVERSAL.BASEURL + "admin/api/export_product_to_csv", {
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
        link.download = `product_${new Date()}.csv`;
        link.click();
        dispatch(unsetLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setSnackBar({
            status: 500,
            message: "Can't export product right now please try again later",
          })
        );
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  };
};
