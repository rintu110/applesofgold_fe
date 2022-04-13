import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";

function EditState(props) {
  const {
    state,
    login,
    updateState,
    resetStateData,
    setStateName,
    setStateCode,
  } = props;
  return (
    <Dialog maxWidth="xs" fullWidth open={state.editState}>
      <DialogTitle>Edit State</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            color="secondary"
            variant="outlined"
            size="small"
            label="State Name"
            fullWidth
            value={state.stateName}
            onChange={(event) => setStateName(event.target.value)}
          />
        </Box>
        <Box sx={{ my: 3 }}>
          <TextField
            color="secondary"
            variant="outlined"
            size="small"
            label="State Code"
            fullWidth
            value={state.stateCode}
            onChange={(event) => setStateCode(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetStateData()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => updateState(login.user_token, state)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditState;
