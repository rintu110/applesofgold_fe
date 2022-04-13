import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from '@mui/material/Autocomplete';

function EditCategory(props) {
  const [_id, setValue] = React.useState({ _id: "", label: "" });
  const {
    setCategoryName,
    setCategoryCode,
    setCategoryContent,
    setCategoryParentId,
    resetCategory,
    updateCategory,
    viewAllCategory,
    category,
    login,
  } = props;

  React.useEffect(() => {
    if (props.categorys.length > 0) {
      setValue({ _id: props.categorys[0]._id, label: props.categorys[0].category_nm })
      viewAllCategory(login.user_token, props.categorys[0].category_nm);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={category.categoryEdit}>
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Category name"
            value={category.categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Category code"
            value={category.categoryCode}
            onChange={(event) => setCategoryCode(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ m: 1 }}>
            <Autocomplete
              value={_id}
              options={category.allCatgory}
              autoComplete={true}
              filterSelectedOptions
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onInputChange={(event, value) => value !== null && value !== undefined && value !== "" && setTimeout(() => {
                viewAllCategory(login.user_token, value);
              }, 200)}
              onChange={(event, value) => { setValue(value); setCategoryParentId(value) }}
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
              disablePortal
              renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  {option.label}
                </li>
              )}

            />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            size="small"
            rows={4}
            color="secondary"
            label="Category content"
            value={category.categoryContent}
            onChange={(event) => setCategoryContent(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetCategory()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => { updateCategory(login.user_token, category); setValue({ _id: "", label: "" }) }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCategory;
