import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from "@mui/material/Autocomplete";

function EditAssignCatPrd(props) {
  const [_id, setValue] = React.useState("");
  const [category_id, setCategoryValue] = React.useState("");
  const {
    viewAllCategory,
    viewAllProduct,
    setAssignCatId,
    setAssignPrdId,
    resetCatPrd,
    updateAssignCatPrd,
    login,
    assign,
    allProduct,
    allCatgory,
  } = props;

  React.useEffect(() => {
    if (props.product !== undefined && props.category !== undefined) {
      setValue({
        _id: props.product._id,
        label: props.product.label,
      });
      setCategoryValue({
        _id: props.category._id,
        label: props.category.label,
      });
      viewAllProduct(login.user_token, props.product.label);
      viewAllCategory(login.user_token, props.category.label);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={assign.editAssignCatPrd}>
      <DialogTitle>Edit Assign Category {"&"} Product</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <Autocomplete
            value={category_id}
            freeSolo
            options={allCatgory}
            autoComplete
            isOptionEqualToValue={(option, value) => true}
            onInputChange={(event, value) =>
              value !== null &&
              value !== undefined &&
              value !== "" &&
              viewAllCategory(login.user_token, value)
            }
            onChange={(event, value) => {
              setCategoryValue(value);
              setAssignCatId(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                color="secondary"
                label="Choose Category"
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
              setAssignPrdId(value);
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
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => {
            resetCatPrd();
            setValue("");
            setCategoryValue("");
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            updateAssignCatPrd(login.user_token, assign);
            setValue("");
            setCategoryValue("");
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAssignCatPrd;
