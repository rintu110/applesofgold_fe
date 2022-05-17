import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Table from "components/UI/Table";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Pagination from "components/UI/Pagination";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AllProduct from "components/UI/allProduct";

function ProductMetaComp(props) {
  const [_id, setValue] = React.useState("");
  const {
    setMetaTitle,
    setMetaDesc,
    setMetaKeyword,
    setForeginId,
    setEditMeta,
    viewProductMeta,
    addProductMeta,
    meta,
    login,
    uploadCSV,
    exportCSV,
    universal,
    updateProductMeta,
    resetMeta,
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
        <>{parseInt(params.row.prd_id) === 0 ? "Non" : params.row.sku}</>
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
              setValue({
                _id: params.row.prd_id,
                sku: params.row.sku,
              });
            }}
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewProductMeta(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  return (
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
          <AllProduct
            onChange={(event) => {
              setForeginId(event);
              setValue(event);
            }}
            value={_id}
            size="small"
          />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ m: 1 }}>
          {meta.metaEdit ? (
            <Button
              variant="contained"
              color="info"
              sx={{ mr: 1 }}
              onClick={() => {
                updateProductMeta(login.user_token, meta, universal);
                setValue("");
              }}
            >
              UPDATE
            </Button>
          ) : (
            <Button
              color="info"
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
              variant="contained"
              onClick={() => {
                addProductMeta(login.user_token, meta, universal);
                setValue("");
              }}
            >
              ADD
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              resetMeta();
              setValue("");
            }}
          >
            RESET
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
        <Search
          CallBack={() => viewProductMeta(login.user_token, universal)}
          searchBy={"Product Meta"}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
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
        <Table
          columns={columns}
          disableSelectionOnClick
          checkboxSelection={false}
        />
      </Grid>
      <Grid container sx={{ bgcolor: "#f7f8fa" }}>
        <Grid item xs={12} md={12}>
          <Pagination />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductMetaComp;
