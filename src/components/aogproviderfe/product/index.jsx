import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "components/UI/Table";
import Button from "components/UI/Button";
import Pagination from "components/UI/Pagination";
import StatusMode from "components/UI/StatusMode";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import AddProduct from "components/aogproviderfe/product/addProduct";

function ProductComp(props) {
  const [product, setOpen] = React.useState({
    open: false,
    title: "",
    productId: "",
    product: "",
  });
  const {
    viewProduct,
    assignProduct,
    unassignProduct,
    deleteProduct,
    uploadCSV,
    exportCSV,
    login,
    universal,
  } = props;

  const columns = [
    {
      field: "product_name",
      flex: 1,
      headerName: "NAME",
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "sku",
      headerName: "SKU",
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
      field: "msrp",
      headerName: "MSRP",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "gender",
      headerName: "GENDER",
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
            onClick={() =>
              setOpen({
                open: true,
                title: "Edit Product",
                productId: params.row._id,
                product: params.row,
              })
            }
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() =>
              deleteProduct(
                login.user_token,
                {
                  localAttribute: params.row.local_attribute,
                  productId: params.row._id,
                },
                universal
              )
            }
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewProduct(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Products
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 2 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() =>
                setOpen({
                  open: true,
                  title: "Add Product",
                  productId: "",
                  product: "",
                })
              }
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            CallBack={() => viewProduct(login.user_token, universal)}
            searchBy={"Product"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => assignProduct(login.user_token, universal)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignProduct(login.user_token, universal)}
              >
                UNASSIGNED
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <CSVFileUpload uploadCSV={uploadCSV} />
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
          <Table columns={columns} />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination />
          </Grid>
        </Grid>
      </Grid>
      {product.open && (
        <AddProduct
          {...props}
          addProductProps={product}
          onClose={() =>
            setOpen({
              ...product,
              open: false,
              title: "",
              productId: "",
              product: "",
            })
          }
        />
      )}
    </>
  );
}

export default ProductComp;
