import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";

function EditCountry(props) {
  const {
    country,
    login,
    updateCountry,
    resetCountryData,
    setCountryName,
    setCountryCode,
  } = props;
  return (
    <Dialog maxWidth="xs" fullWidth open={country.editCountry}>
      <DialogTitle>Edit Country</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            color="secondary"
            variant="outlined"
            size="small"
            label="Country Name"
            fullWidth
            value={country.countryName}
            onChange={(event) => setCountryName(event.target.value)}
          />
        </Box>
        <Box sx={{ my: 3 }}>
          <TextField
            color="secondary"
            variant="outlined"
            size="small"
            label="Country Code"
            fullWidth
            value={country.countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetCountryData()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => updateCountry(login.user_token, country)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCountry;
