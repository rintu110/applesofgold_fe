import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "../../../UI/TextField";
import Button from "../../../UI/Button";

function EditCategoryMeta(props) {
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
  } = props;

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
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            fullWidth
            select
            color="secondary"
            label="Category"
            value={meta.metaCategoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <MenuItem value={""}>{"Non"}</MenuItem>
            {allCatgory !== undefined &&
              allCatgory !== null &&
              allCatgory.length > 0 &&
              allCatgory.map((item, index) => (
                <MenuItem value={item._id} key={index}>
                  {item.category_nm}
                </MenuItem>
              ))}
          </TextField>
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Meta keyword"
            value={meta.metaKeyword}
            onChange={(event) => setMetaKeyword(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
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
          onClick={() => updateMeta(login.user_token, meta)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCategoryMeta;
