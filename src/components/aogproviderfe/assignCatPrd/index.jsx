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
import EditAssignCatPrd from "components/aogproviderfe/assignCatPrd/editAssignCatPrd";

function AssignCategoryProductComp(props) {
  const [_id, setValue] = React.useState("");
  const [category_id, setCategoryValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [product, setProduct] = React.useState("");
  const {
    viewAllCategory,
    viewAllProduct,
    setAssignCatId,
    setAssignPrdId,
    setAssignCatPrdSearchKeyword,
    setAssignedUnassignedCatPrd,
    setEditAssignCatPrd,
    setAssignStartingAfter,
    setAssignLimit,
    viewAssignCatPrd,
    addAssignCatPrd,
    assignedCatPrd,
    unassignedCatPrd,
    uploadCSV,
    exportCSV,
    login,
    assign,
    allProduct,
    allCatgory,
  } = props;

  const columns = [
    {
      field: "category_nm",
      flex: 1,
      headerName: "CATEGORY",
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "product_nm",
      headerName: "PRODUCT",
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
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditAssignCatPrd(params.row);
              setProduct({
                _id: params.row.prd_id,
                label: params.row.product_nm,
              });
              setCategory({
                _id: params.row.cat_id,
                label: params.row.category_nm,
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
    viewAssignCatPrd(login.user_token, assign);
  }, [login.user_token]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Assign Category {"&"} Product
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                PRODUCT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ m: 1 }}>
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
                  placeholder="Choose Category"
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
        <Grid item xs={5}>
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
                setAssignPrdId(value);
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
                addAssignCatPrd(login.user_token, assign);
                setValue("");
                setCategoryValue("");
              }}
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Assign Category {"&"} Product List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Assing Category and Product"
              value={assign.assignCatPrdSearchKeyWord}
              onChange={(event) =>
                setAssignCatPrdSearchKeyword(event.target.value)
              }
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewAssignCatPrd(login.user_token, assign)}
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
              onClick={() => assignedCatPrd(login.user_token, assign)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignedCatPrd(login.user_token, assign)}
              >
                UNASSIGNED
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <label htmlFor="assign-csv-file">
                <input
                  accept=".csv"
                  id="assign-csv-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    uploadCSV(login.user_token, event.target.files[0], assign)
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
            rows={assign.assignCatPrdStore}
            columns={columns}
            selectionModel={assign.assignUnAssignStore}
            onSelectionModelChange={(row) => setAssignedUnassignedCatPrd(row)}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={assign.startingAfter}
              total={assign.total}
              limit={assign.limit}
              nextPage={() =>
                setAssignStartingAfter(
                  login.user_token,
                  assign,
                  parseInt(assign.startingAfter) + parseInt(assign.limit)
                )
              }
              previousPage={() =>
                setAssignStartingAfter(
                  login.user_token,
                  assign,
                  parseInt(assign.startingAfter) - parseInt(assign.limit)
                )
              }
              setLimit={(event) =>
                setAssignLimit(login.user_token, assign, event)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {assign.editAssignCatPrd && (
        <EditAssignCatPrd {...props} product={product} category={category} />
      )}
    </>
  );
}

export default AssignCategoryProductComp;
