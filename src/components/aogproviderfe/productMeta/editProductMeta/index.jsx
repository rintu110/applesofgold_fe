import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from "@mui/material/Autocomplete";

function EditProductMeta(props) {
  const [_id, setValue] = React.useState("");
  const {
    setMetaTitle,
    setMetaDesc,
    setMetaKeyword,
    setForeginId,
    meta,
    login,
    allProduct,
    viewAllProduct,
    updateProductMeta,
    resetMeta,
    universal,
  } = props;

  React.useEffect(() => {
    if (props.product !== undefined) {
      setValue({
        _id: props.product._id,
        label: props.product.label,
      });
      viewAllProduct(login.user_token, props.product.label);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={meta.metaEdit}>
      <DialogTitle>Edit Product Meta</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Meta title"
            value={meta.metaTitle}
            onChange={(event) => setMetaTitle(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            value={_id}
            options={allProduct}
            freeSolo
            autoComplete
            isOptionEqualToValue={(option, value) => true}
            onInputChange={(event, value) =>
              value !== null &&
              value !== undefined &&
              value !== "" &&
              viewAllProduct(login.user_token, value)
            }
            onChange={(event, value) => {
              setValue(value);
              setForeginId(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                color="secondary"
                label="Choose Product"
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
            label="Meta keyword"
            value={meta.metaKeyword}
            onChange={(event) => setMetaKeyword(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            multiline
            size="small"
            rows={4}
            color="secondary"
            label="Meta description"
            value={meta.metaDesc}
            onChange={(event) => setMetaDesc(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetMeta()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            updateProductMeta(login.user_token, meta, universal);
            setValue("");
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProductMeta;
