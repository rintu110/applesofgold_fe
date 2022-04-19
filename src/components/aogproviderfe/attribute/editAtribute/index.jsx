import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";

function EditAttributes(props) {
  const {
    setAttributePrompt,
    setAttributeCode,
    resetAttribute,
    updateAttribute,
    universal,
    login,
    attribute,
  } = props;

  return (
    <Dialog maxWidth="xs" fullWidth open={attribute.editAttribute}>
      <DialogTitle>Edit Attribute</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Attribute prompt"
            value={attribute.prompt}
            onChange={(event) => setAttributePrompt(event.target.value)}
          />
        </Box>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Attribute code"
            value={attribute.code}
            onChange={(event) => setAttributeCode(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetAttribute()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() =>
            updateAttribute(login.user_token, attribute, universal)
          }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAttributes;
