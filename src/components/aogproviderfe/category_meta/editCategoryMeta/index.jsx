import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from '@mui/material/Autocomplete';


function EditCategoryMeta(props) {
  const [_id, setValue] = React.useState({ _id: "", label: "" });
  const {
    resetMeta,
    updateMeta,
    meta,
    login,
    allCatgory,
    setMetaTitle,
    setMetaDesc,
    setMetaKeyword,
    setCategoryId,
    setMetaContent,
    viewAllCategory
  } = props;


  React.useEffect(() => {
    if (props.category.length > 0) {
      setValue({ _id: props.category[0]._id, label: props.category[0].category_nm })
      viewAllCategory(login.user_token, props.category[0].category_nm);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={meta.metaEdit}>
      <DialogTitle>Edit Category</DialogTitle>
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
            options={allCatgory}
            autoComplete={true}
            filterSelectedOptions
            fullWidth
            isOptionEqualToValue={(option, value) => true}
            onInputChange={(event, value) => value !== null && value !== undefined && value !== "" && setTimeout(() => {
              viewAllCategory(login.user_token, value);
            }, 200)}
            onChange={(event, value) => { setValue(value); setCategoryId(value) }}
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
            size="small"
            fullWidth
            color="secondary"
            label="Meta Content"
            value={meta.metaContent}
            onChange={(event) => setMetaContent(event.target.value)}
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
          onClick={() => { updateMeta(login.user_token, meta); setValue({ _id: "", label: "" }) }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCategoryMeta;
