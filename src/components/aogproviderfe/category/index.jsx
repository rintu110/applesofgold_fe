import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Table from "components/UI/Table";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import StatusMode from "components/UI/StatusMode";
import Pagination from "components/UI/Pagination";
import EditCategory from "components/aogproviderfe/category/editCategory";
import Autocomplete from "@mui/material/Autocomplete";

function CategoryComp(props) {
  const [_id, setValue] = React.useState("");
  const [categorys, setCategory] = React.useState("");
  const {
    setCategoryName,
    setCategoryCode,
    setCategoryContent,
    setCategoryParentId,
    setCategoryKeyWord,
    setAssignUnassignCategory,
    setEditCategory,
    viewCategory,
    addCategory,
    assignedCategory,
    unassignedCategory,
    category,
    login,
    setCategoryLimit,
    setCategoryStartingAfter,
    viewAllCategory,
    uploadCSV,
    exportCSV,
  } = props;

  const columns = [
    {
      field: "category_nm",
      flex: 1,
      headerName: "CATEGORY NAME",
      minWidth: 150,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "CATEGORY CODE",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
      renderCell: (params) => (
        <StatusMode active={params.row.status === 1 ? true : false} />
      ),
    },
    {
      field: "page_content",
      headerName: "CATEGORY CONTENT",
      width: 350,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "parent_id",
      headerName: "PARENT",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) => (
        <>
          {parseInt(params.row.parent_id) === 0
            ? "Non"
            : params.row.parent.length > 0 && params.row.parent[0].category_nm}
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
            onClick={() => {
              setEditCategory(params.row);
              setCategory(params.row.parent);
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
    viewCategory(login.user_token, category);
  }, [login.user_token]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Category
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY PARENT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CATEGORY CONTENT
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
              placeholder="Category name"
              value={category.categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Category code"
              value={category.categoryCode}
              onChange={(event) => setCategoryCode(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ m: 1 }}>
            <Autocomplete
              value={_id}
              options={category.allCatgory}
              freeSolo
              autoComplete
              isOptionEqualToValue={(option, value) => true}
              onInputChange={(event, value) =>
                value !== null &&
                value !== undefined &&
                value !== "" &&
                setTimeout(() => {
                  viewAllCategory(login.user_token, value);
                }, 200)
              }
              onChange={(event, value) => {
                setValue(value);
                setCategoryParentId(value);
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
        <Grid item xs={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Category content"
              value={category.categoryContent}
              onChange={(event) => setCategoryContent(event.target.value)}
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
                addCategory(login.user_token, category);
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
              Category List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Category"
              value={category.categoryKeyWord}
              onChange={(event) => setCategoryKeyWord(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewCategory(login.user_token, category)}
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
              onClick={() => assignedCategory(login.user_token, category)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignedCategory(login.user_token, category)}
              >
                UNASSIGNED
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <label htmlFor="category-csv-file">
                <input
                  accept=".csv"
                  id="category-csv-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    uploadCSV(login.user_token, event.target.files[0], category)
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
            rows={category.categoryStore}
            columns={columns}
            selectionModel={category.categoryAssign}
            onSelectionModelChange={(row) => setAssignUnassignCategory(row)}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={category.statingAfter}
              total={category.total}
              limit={category.limit}
              nextPage={() =>
                setCategoryStartingAfter(
                  login.user_token,
                  category,
                  parseInt(category.statingAfter) + parseInt(category.limit)
                )
              }
              previousPage={() =>
                setCategoryStartingAfter(
                  login.user_token,
                  category,
                  parseInt(category.statingAfter) - parseInt(category.limit)
                )
              }
              setLimit={(event) =>
                setCategoryLimit(login.user_token, category, event)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {category.categoryEdit && (
        <EditCategory {...props} categorys={categorys} />
      )}
    </>
  );
}

export default CategoryComp;