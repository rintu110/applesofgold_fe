import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#758b38",
    },
    login: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#0c88f6",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            border: "0px solid #fff",
            backgroundColor: "#fff",
          },
          border: "0px solid #fff",
          backgroundColor: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        colorSecondary: {
          borderRadius: 3,
        },
        sizeSmall: {
          fontSize: 14,
        },
        colorPrimary: {
          padding: 0,
          borderRadius: 0,
        },
      },
    },
  },
});

function CustomTextField(props) {
  return (
    <ThemeProvider theme={theme}>
      <TextField {...props} />
    </ThemeProvider>
  );
}

export default CustomTextField;
