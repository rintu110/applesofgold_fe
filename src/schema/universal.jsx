import * as yup from "yup";
import * as schemaValid from "constants/schema";
import { setSnackBar } from "actions/universal";

export const assignUnassignSchema = (body, callBack) => {
  return (dispatch) => {
    const schema = yup.object({
      assignUnassignedStore: yup
        .array()
        .min(1, "Please select at least one assign!")
        .of(
          yup
            .string()
            .trim()
            .matches(schemaValid.OBJECT_ID, "Invalid assign _id !")
        )
        .required("Please select at least one assign!"),
    });

    schema
      .validate({ ...body })
      .then(() => {
        callBack(true);
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
        callBack(false);
      });
  };
};

export const csvSchema = (body, callBack) => {
  return (dispatch) => {
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
      .validate({ csv: body })
      .then(() => {
        callBack(true);
      })
      .catch((err) => {
        dispatch(
          setSnackBar({
            status: 500,
            message: err.errors[0],
          })
        );
        callBack(false);
      });
  };
};
