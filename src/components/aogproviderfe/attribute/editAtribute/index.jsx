import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

function EditAttributes(props) {
  const {
    setAttributePrompt,
    setAttributeCode,
    resetAttribute,
    updateAttribute,
    universal,
    login,
    attribute,
    setAttributeLabel,
    setAttributeImage,
    setAttributeType,
    setAttributeLabelCode,
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
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Attribute label"
            value={attribute.label}
            onChange={(event) => setAttributeLabel(event.target.value)}
          />
        </Box>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Label code"
            value={attribute.labelCode}
            onChange={(event) => setAttributeLabelCode(event.target.value)}
          />
        </Box>
        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <Avatar
            src={attribute.image}
            alt="attribute img"
            variant="rounded"
            sx={{ mr: 0.5 }}
          />
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Attribute image"
            value={attribute.image}
            onChange={(event) => setAttributeImage(event.target.value)}
          />
          <Box sx={{ ml: 0.5 }}>
            <label htmlFor="attribute-images">
              <input
                accept="image/*"
                id="attribute-images"
                type="file"
                style={{ display: "none" }}
                // onChange={(event) =>
                //   uploadCSV(
                //     state.login.user_token,
                //     event.target.files[0],
                //     state.universal
                //   )
                // }
              />
              <IconButton size="small" component="span">
                <CloudUploadIcon sx={{ color: "#03a5fc" }} />
              </IconButton>
            </label>
          </Box>
        </Box>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            select
            label="Attribute type"
            value={attribute.type}
            onChange={(event) => setAttributeType(event.target.value)}
          >
            {[
              { code: "checkBox", label: "checkbox" },
              { code: "radioButton", label: "radio Button" },
              { code: "dropdownList", label: "Dropdown list" },
              { code: "textBox", label: "Textbox" },
              { code: "textArea", label: "Text Area" },
            ].map((data, index) => (
              <MenuItem value={data.code} key={index}>
                {data.label}
              </MenuItem>
            ))}
          </TextField>
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
