import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { unsetSnackBar } from "../../../actions/universal";

function CustomSnackbar() {
  const dispatch = useDispatch();

  const universal = useSelector((store) => store.universalReducer);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={universal.snack}
      autoHideDuration={5000}
      onClose={() => dispatch(unsetSnackBar())}
    >
      <MuiAlert
        onClose={() => dispatch(unsetSnackBar())}
        elevation={6}
        variant="filled"
        severity={
          universal.status === true
            ? "success"
            : universal.status === 500
            ? "warning"
            : universal.status === false && "error"
        }
      >
        {universal.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomSnackbar;
