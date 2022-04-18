import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Table from "components/UI/Table";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Pagination from "components/UI/Pagination";
import EditProductMeta from "components/aogproviderfe/productMeta/editProductMeta";
import Autocomplete from "@mui/material/Autocomplete";

function ProductMetaComp(props) {
  const [_id, setValue] = React.useState("");
  const [product, setProduct] = React.useState("");
  const {
    setMetaTitle,
    setMetaDesc,
    setMetaKeyword,
    setForeginId,
    setMetaSearchKeyword,
    setEditMeta,
    viewProductMeta,
    addProductMeta,
    meta,
    login,
    allProduct,
    uploadCSV,
    exportCSV,
    setMetaStartingAfter,
    setMetaLimit,
    viewAllProduct,
    resetEverythingMeta,
  } = props;

  const columns = [
    {
      field: "meta_title",
      flex: 1,
      headerName: "META TITLE",
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "meta_desc",
      headerName: "META DESCRIPTION",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "meta_keyword",
      headerName: "META KEYWORD",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
    },
    {
      field: "prd_id",
      headerName: "PRODUCT",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) => (
        <>{parseInt(params.row.prd_id) === 0 ? "Non" : params.row.product_nm}</>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditMeta({ ...params.row, foregin_id: params.row.prd_id });
              setProduct({
                _id: params.row.prd_id,
                label: params.row.product_nm,
              });
            }}
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
    resetEverythingMeta();
    viewProductMeta(login.user_token, meta);
  }, [login.user_token]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Product Meta
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                META TITLE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                META DESC
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                META KEYWORD
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Meta title"
              value={meta.metaTitle}
              onChange={(event) => setMetaTitle(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Meta description"
              value={meta.metaDesc}
              onChange={(event) => setMetaDesc(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Meta keyword"
              value={meta.metaKeyword}
              onChange={(event) => setMetaKeyword(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ m: 1 }}>
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
                  placeholder="Choose Product"
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
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={() => {
                addProductMeta(login.user_token, meta);
                setValue("");
              }}
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Product Meta List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Product Meta"
              value={meta.metaSearchKeyword}
              onChange={(event) => setMetaSearchKeyword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewProductMeta(login.user_token, meta)}
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
            <Box sx={{ mr: 2 }}>
              <label htmlFor="category-meta-csv-file">
                <input
                  accept=".csv"
                  id="category-meta-csv-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    uploadCSV(login.user_token, event.target.files[0], meta)
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
            rows={meta.metaStore}
            columns={columns}
            disableSelectionOnClick
            checkboxSelection={false}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={meta.startingAfter}
              total={meta.total}
              limit={meta.limit}
              nextPage={() =>
                setMetaStartingAfter(
                  login.user_token,
                  meta,
                  parseInt(meta.startingAfter) + parseInt(meta.limit),
                  viewProductMeta(login.user_token, meta)
                )
              }
              previousPage={() =>
                setMetaStartingAfter(
                  login.user_token,
                  meta,
                  parseInt(meta.startingAfter) - parseInt(meta.limit),
                  viewProductMeta(login.user_token, meta)
                )
              }
              setLimit={(event) =>
                setMetaLimit(
                  login.user_token,
                  meta,
                  event,
                  viewProductMeta(login.user_token, meta)
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {meta.metaEdit && <EditProductMeta {...props} product={product} />}
    </>
  );
}

export default ProductMetaComp;
