import {
  setLoader,
  setSnackBar,
  unsetLoader,
  setDataStore,
  setTotal,
  setAssignedUnassignedStore,
  ApiAction,
  ApiFileAction,
  ApiFileDownLoadAction,
} from "actions/universal";
import UNIVERSAL from "@/config";
import * as yup from "yup";
import * as schemaConst from "constants/schema";
import { assignUnassignSchema, csvSchema } from "@/schema/universal";

export const viewProduct = (token, universal) => {
  return (dispatch) => {
    let body = {
      user_token: token,
      startingAfter: universal.startingAfter,
      limit: universal.limit,
      searchKeyWord: universal.searchKeyword,
    };

    dispatch(
      ApiAction(
        "admin/api/product/view_product",
        body,
        "Can't view product right now please try again later",
        (status, message, result, total) => {
          dispatch(setDataStore(result));
          dispatch(setTotal(total));
        }
      )
    );
  };
};

export const addProduct = (token, payload, universal, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      productName: yup
        .string()
        .trim()
        .required("Please enter your product name"),
      msrp: yup.string().trim().required("Please enter your product msrp"),
      sku: yup.string().trim().required("Please enter your product sku"),
      price: yup.string().trim().required("Please enter your product price"),
      countryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Please select your  country"),
      gender: yup.string().trim(),
      metaltype: yup.string().trim(),
      weight: yup.string().trim(),
      quantity: yup.string().trim(),
      description: yup.string().trim(),
      thumbnailImage: yup.string().trim().url(),
      closeupImage: yup.string().trim().url(),
      alternativeImages: yup
        .array()
        .of(
          yup.string().trim().url("Please enter only image url nothing else!")
        ),
      shippingMessageId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Please select your shipping message"),
      relatedProductIds: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Please select products")
        ),
      categoryIds: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(
              schemaConst.OBJECT_ID,
              "Please select at least one category"
            )
        ),
      localAttribute: yup.array().of(
        yup.object({
          prompt: yup.string().trim(),
          code: yup.string().trim(),
          image: yup.string().trim().url(),
          attr_type: yup
            .string()
            .trim()
            .oneOf([
              "checkBox",
              "radioButton",
              "dropdownList",
              "textBox",
              "textArea",
            ]),
          attr_options: yup.array().of(
            yup.object({
              prompt: yup
                .string()
                .trim()
                .required("Please enter your attribute option prompt"),
              code: yup
                .string()
                .trim()
                .required("Please enter your attribute option code"),
              price: yup
                .string()
                .trim()
                .required("Please enter your attribute option price"),
              defaults: yup
                .boolean()
                .oneOf([true, false])
                .required("Please enter your attribute option defaults"),
            })
          ),
          required: yup.boolean().oneOf([true, false]),
        })
      ),
      global_attribute_ids: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(
              schemaConst.OBJECT_ID,
              "Please select at least one global attributes"
            )
        ),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          product_name: payload.productName,
          sku: payload.sku,
          msrp: payload.msrp,
          price: payload.price,
          description: payload.description,
          thumbnail_image: payload.thumbnailImage,
          closeup_image: payload.closeupImage,
          alternative_images: payload.alternativeImages.filter(
            (item) => item !== ""
          ),
          shipping_message_id: payload.shippingMessageId,
          related_product_ids: payload.relatedProductIds,
          category_ids: payload.categoryIds,
          local_attribute: payload.localAttribute,
          country_id: payload.countryId,
          gender: payload.gender,
          metaltype: payload.metaltype,
          weight: payload.weight,
          quantity: payload.quantity,
          global_attribute_ids: payload.globalAttribute,
        };

        dispatch(
          ApiAction(
            "admin/api/product/add_product",
            body,
            "Can't add  Product right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewProduct(token, universal));
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

export const updateProduct = (token, payload, universal, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      productName: yup
        .string()
        .trim()
        .required("Please enter your product name"),
      msrp: yup.string().trim().required("Please enter your product msrp"),
      sku: yup.string().trim().required("Please enter your product sku"),
      price: yup.string().trim().required("Please enter your product price"),
      description: yup.string().trim(),
      countryId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Please select your  country"),
      gender: yup.string().trim(),
      metaltype: yup.string().trim(),
      weight: yup.string().trim(),
      quantity: yup.string().trim(),
      thumbnailImage: yup.string().trim().url(),
      closeupImage: yup.string().trim().url(),
      alternativeImages: yup
        .array()
        .of(
          yup.string().trim().url("Please enter only image url nothing else!")
        ),
      shippingMessageId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Please select your shipping message"),
      relatedProductIds: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Please select products")
        ),
      categoryIds: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(
              schemaConst.OBJECT_ID,
              "Please select at least one category"
            )
        ),
      global_attribute_ids: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(
              schemaConst.OBJECT_ID,
              "Please select at least one global attributes"
            )
        ),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          product_name: payload.productName,
          sku: payload.sku,
          msrp: payload.msrp,
          price: payload.price,
          description: payload.description,
          thumbnail_image: payload.thumbnailImage,
          closeup_image: payload.closeupImage,
          alternative_images: payload.alternativeImages.filter(
            (item) => item !== ""
          ),
          shipping_message_id: payload.shippingMessageId,
          product_id: payload.productId,
          category_ids: payload.categoryIds,
          related_product_ids: payload.relatedProductIds,
          country_id: payload.countryId,
          gender: payload.gender,
          metaltype: payload.metaltype,
          weight: payload.weight,
          quantity: payload.quantity,
          global_attribute_ids: payload.globalAttribute,
        };

        dispatch(
          ApiAction(
            "admin/api/product/edit_product",
            body,
            "Can't update  Product right now please try again later",
            (status, message, result) => {
              if (status) {
                callBack(true);
                dispatch(viewProduct(token, universal));
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

export const deleteProduct = (token, payload, universal) => {
  return (dispatch) => {
    const schema = yup.object({
      localAttribute: yup
        .array()
        .of(
          yup
            .string()
            .trim()
            .matches(schemaConst.OBJECT_ID, "Please enter your local attribute")
        ),
      productId: yup
        .string()
        .trim()
        .matches(schemaConst.OBJECT_ID, "Please enter your produt _id")
        .required("Please enter your product _id"),
    });

    schema
      .validate({ ...payload })
      .then(() => {
        let body = {
          user_token: token,
          product_id: payload.productId,
          local_attribute: payload.localAttribute,
        };

        dispatch(
          ApiAction(
            "admin/api/product/delete_product",
            body,
            "Can't delete Product right now please try again later",
            (status, message, result) => {
              if (status) {
                dispatch(viewProduct(token, universal));
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

export const assignProduct = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/product/assigned_product",
              {
                user_token: token,
                _id: universal.assignUnassignedStore,
              },
              "Can't assign product right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewProduct(token, universal));
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

export const unassignProduct = (token, universal) => {
  return (dispatch) => {
    dispatch(
      assignUnassignSchema(universal, (assignstatus) => {
        if (assignstatus) {
          dispatch(
            ApiAction(
              "admin/api/product/unassigned_product",
              {
                user_token: token,
                _id: universal.assignUnassignedStore,
              },
              "Can't unassign product right now please try again later",
              (status, message, result) => {
                if (status) {
                  dispatch(viewProduct(token, universal));
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

export const uploadCSV = (token, csv, universal) => {
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
          UNIVERSAL.BASEURL + "admin/api/product/add_product_from_csv",
          {
            method: "POST",
            body: formdata,
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status) {
              dispatch(viewProduct(token, universal));
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

    return fetch(
      UNIVERSAL.BASEURL + "admin/api/product/export_product_to_csv",
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
