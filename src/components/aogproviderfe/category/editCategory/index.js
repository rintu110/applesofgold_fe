import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "../../../UI/TextField";
import Button from "../../../UI/Button";

function EditCategory(props) {
  const {
    setCategoryName,
    setCategoryCode,
    setCategoryContent,
    setCategoryParentId,
    resetCategory,
    updateCategory,
    category,
    login,
  } = props;

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
          <TextField
            size="small"
            fullWidth
            select
            color="secondary"
            label="Category Parent"
            value={category.categoryParentId}
            onChange={(event) => setCategoryParentId(event.target.value)}
          >
            <MenuItem value={0}>Non</MenuItem>
            {category.categoryStore !== undefined &&
              category.categoryStore !== null &&
              category.categoryStore.length > 0 &&
              category.categoryStore.map((item, index) => (
                <MenuItem
                  value={item._id}
                  key={index}
                  disabled={category.categoryID === item._id}
                >
                  {item.category_nm}
                </MenuItem>
              ))}
          </TextField>
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
          onClick={() => updateCategory(login.user_token, category)}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCategory;
