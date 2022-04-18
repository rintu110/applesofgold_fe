import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Autocomplete from "@mui/material/Autocomplete";

function EditProduct(props) {
  const [_id, setValue] = React.useState("");
  const {
    setProductName,
    setProductCode,
    setProductCost,
    setProductPrice,
    setProductWeight,
    setProductDescription,
    setProductTaxable,
    setProductCategoryId,
    resetProduct,
    updateProduct,
    product,
    login,
    allCatgory,
    viewAllCategory,
  } = props;

  React.useEffect(() => {
    if (props.category !== undefined) {
      setValue({
        _id: props.category._id,
        label: props.category.label,
      });
      viewAllCategory(login.user_token, props.category.label);
    }
  }, []);

  return (
    <Dialog maxWidth="xs" fullWidth open={product.productEdit}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product name"
            value={product.productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            value={_id}
            options={allCatgory}
            freeSolo
            autoComplete
            isOptionEqualToValue={(option, value) => true}
            onInputChange={(event, value) =>
              value !== null &&
              value !== undefined &&
              value !== "" &&
              viewAllCategory(login.user_token, value)
            }
            onChange={(event, value) => {
              setValue(value);
              setProductCategoryId(value);
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
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product code"
            value={product.productCode}
            onChange={(event) => setProductCode(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product price"
            value={product.productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product cost"
            value={product.productCost}
            onChange={(event) => setProductCost(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product weight"
            value={product.productWeight}
            onChange={(event) => setProductWeight(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            color="secondary"
            label="Product taxable"
            value={product.productTaxable}
            onChange={(event) => setProductTaxable(event.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            multiline
            rows={4}
            color="secondary"
            label="Product description"
            value={product.productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => resetProduct()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            updateProduct(login.user_token, product);
            setValue({ _id: "", label: "" });
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProduct;
