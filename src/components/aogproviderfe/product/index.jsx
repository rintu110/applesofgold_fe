import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "components/UI/Table";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Pagination from "components/UI/Pagination";
import StatusMode from "components/UI/StatusMode";

function ProductComp(props) {
  const [_id, setValue] = React.useState({ _id: "", label: "" });
  const [category, setCategory] = React.useState("");
  const {
    setProductName,
    setProductCode,
    setProductCost,
    setProductPrice,
    setProductWeight,
    setProductDescription,
    setProductTaxable,
    setProductCategoryId,
    setProductAssignUnassigned,
    setEditProduct,
    resetProduct,
    setProductKeyword,
    viewProduct,
    addProduct,
    updateProduct,
    assignProduct,
    unassignProduct,
    uploadCSV,
    exportCSV,
    product,
    login,
    allCatgory,
    viewAllCategory,
    setProductStartingAfter,
    setProductLimit,
  } = props;

  const columns = [
    {
      field: "product_nm",
      flex: 1,
      headerName: "NAME",
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "CODE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "price",
      headerName: "PRICE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "weight",
      headerName: "WEIGHT",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "cost",
      headerName: "COST",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "taxable",
      headerName: "TAXABLE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "prd_desc",
      headerName: "DESCRIPTION",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
      renderCell: (params) => (
        <StatusMode active={params.row.status === 1 ? true : false} />
      ),
    },
    {
      field: "cat_id",
      headerName: "CATEGORY",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) => (
        <>
          {parseInt(params.row.cat_id) === 0
            ? "Non"
            : params.row.category.length > 0 &&
              params.row.category[0].category_nm}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      flex: 0.7,
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            //  onClick={() => {
            //    setEditCategory(params.row);
            //    setCategory(params.row.parent);
            //  }}
          >
            <Icon fontSize="small" color="secondary">
              edit
            </Icon>
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewProduct(login.user_token, product);
  }, [login.user_token]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Product
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT PRICE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT COST
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT WEIGHT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT TAXABLE
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product name"
              value={product.productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product code"
              value={product.productCode}
              onChange={(event) => setProductCode(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product price"
              value={product.productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product cost"
              value={product.productCost}
              onChange={(event) => setProductCost(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product weight"
              value={product.productWeight}
              onChange={(event) => setProductWeight(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product taxable"
              value={product.productTaxable}
              onChange={(event) => setProductTaxable(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT DESCRIPTION
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Product description"
              value={product.productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ m: 1 }}>
            <Autocomplete
              value={_id}
              options={allCatgory}
              autoComplete={true}
              filterSelectedOptions
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
                  placeholder="Choose Category"
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
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={() => {
                addProduct(login.user_token, product);
                setValue({ _id: "", label: "" });
              }}
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Product List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Product"
              value={product.productKeyword}
              onChange={(event) => setProductKeyword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewProduct(login.user_token, product)}
                  >
                    Search
                  </Button>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => assignProduct(login.user_token, product)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignProduct(login.user_token, product)}
              >
                UNASSIGNED
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <label htmlFor="product-csv-file">
                <input
                  accept=".csv"
                  id="product-csv-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    uploadCSV(login.user_token, event.target.files[0], product)
                  }
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  component="span"
                >
                  Import
                </Button>
              </label>
            </Box>
            <Box>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => exportCSV(login.user_token)}
              >
                Export
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            rows={product.productStore}
            columns={columns}
            selectionModel={product.productAssign}
            onSelectionModelChange={(row) => setProductAssignUnassigned(row)}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={product.startingAfter}
              total={product.total}
              limit={product.limit}
              nextPage={() =>
                setProductStartingAfter(
                  login.user_token,
                  product,
                  parseInt(product.startingAfter) + parseInt(product.limit)
                )
              }
              previousPage={() =>
                setProductStartingAfter(
                  login.user_token,
                  product,
                  parseInt(product.startingAfter) - parseInt(product.limit)
                )
              }
              setLimit={(event) =>
                setProductLimit(login.user_token, product, event)
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductComp;
