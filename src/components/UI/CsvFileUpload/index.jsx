import * as React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "components/UI/Button";

const Input = styled("input")(({ theme }) => ({
  display: "none",
}));

function CSVFileUpload({ uploadCSV }) {
  const state = useSelector((store) => ({
    login: store.loginReducer,
    universal: store.universalReducer,
  }));

  return (
    <label htmlFor="csv-file">
      <Input
        accept=".csv"
        id="csv-file"
        type="file"
        onChange={(event) =>
          uploadCSV(
            state.login.user_token,
            event.target.files[0],
            state.universal
          )
        }
      />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        component="span"
      >
        Import
      </Button>
    </label>
  );
}

export default CSVFileUpload;
