import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#758b38",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#5e72e4",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#3aff60",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: 0,
        },
      },
    },
  },
});

function CustomButton(props) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>
  );
}

export default CustomButton;
