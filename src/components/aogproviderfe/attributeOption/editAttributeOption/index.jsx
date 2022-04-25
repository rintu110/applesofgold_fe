import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";

function EditAttributeOption(props) {
  const [_id, setValue] = React.useState("");
  const {
    setAttributePrompt,
    setAttributeCode,
    resetAttribute,
    setAttributeImage,
    setOptionPrice,
    setOptionCost,
    setAttributeId,
    viewAllAttribute,
    updateAttributeOption,
    attribute,
    login,
    universal,
  } = props;

  React.useEffect(() => {
    if (props.attributeData !== undefined) {
      setValue({
        _id: props.attributeData._id,
        label: props.attributeData.label,
      });
      viewAllAttribute(login.user_token, props.attributeData.label);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={attribute.editAttribute}>
      <DialogTitle>Edit Attribute Option</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Option prompt"
            value={attribute.prompt}
            onChange={(event) => setAttributePrompt(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Option code"
            value={attribute.code}
            onChange={(event) => setAttributeCode(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            value={_id}
            options={attribute.allAttribute}
            freeSolo
            autoComplete
            isOptionEqualToValue={(option, value) => true}
            onInputChange={(event, value) =>
              value !== null &&
              value !== undefined &&
              value !== "" &&
              viewAllAttribute(login.user_token, value)
            }
            onChange={(event, value) => {
              setValue(value);
              setAttributeId(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                color="secondary"
                label="Choose Attribute"
              />
            )}
            disableListWrap
            renderOption={(props, option) => (
              <li {...props} key={option._id}>
                {option.label}
              </li>
            )}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Option price"
            value={attribute.price}
            onChange={(event) => setOptionPrice(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Option cost"
            value={attribute.cost}
            onChange={(event) => setOptionCost(event.target.value)}
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
            updateAttributeOption(login.user_token, attribute, universal)
          }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAttributeOption;
