import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

function Loader() {
  const universal = useSelector((store) => store.universalReducer);

  return (
    <Dialog open={universal.load}>
      <DialogTitle>
        <CircularProgress />
      </DialogTitle>
    </Dialog>
  );
}

export default Loader;
