import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#758b38",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        sizeSmall: {
          fontSize: 14,
        },
        root: {
          // Some CSS
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
