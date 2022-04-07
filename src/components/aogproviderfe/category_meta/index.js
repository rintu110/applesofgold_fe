import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Table from "../../UI/Table";
import TextField from "../../UI/TextField";
import Button from "../../UI/Button";
import Pagination from "../../UI/Pagination";
import EditCategoryMeta from "./editCategoryMeta";

function CategoryMetaComp(props) {
  const {
    setMetaTitle,
    setMetaDesc,
    setMetaKeyword,
    setCategoryId,
    setMetaSearchKeyword,
    setEditMeta,
    resetMeta,
    viewMeta,
    addMeta,
    updateMeta,
    meta,
    login,
    allCatgory,
    viewAllCategory,
  } = props;

  const columns = [
    {
      field: "meta_title",
      flex: 1,
      headerName: "META TITLE",
      minWidth: 150,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "meta_desc",
      headerName: "META DESCRIPTION",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "meta_keyword",
      headerName: "META KEYWORD",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      disableSelectionOnClick: true,
    },
    {
      field: "cat_id",
      headerName: "CATEGORY",
      flex: 1,
      width: 350,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) => (
        <>
          {allCatgory.map(
            (item, index) =>
              item._id === params.row.cat_id && (
                <Typography variant="caption" key={index}>
                  {item.category_nm}
                </Typography>
              )
          )}
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
          <IconButton size="small" onClick={() => setEditMeta(params.row)}>
            <Icon fontSize="small" color="secondary">
              edit
            </Icon>
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewMeta(login.user_token, meta);
    viewAllCategory(login.user_token);
  }, [login.user_token]);

  console.log(meta);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Category Meta
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
                CATEGORY
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
            <TextField
              size="small"
              fullWidth
              select
              color="secondary"
              placeholder="Category"
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
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={() => addMeta(login.user_token, meta)}
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Category Meta List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Category Meta"
              value={meta.metaSearchKeyword}
              onChange={(event) => setMetaSearchKeyword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewMeta(login.user_token, meta)}
                  >
                    Search
                  </Button>
                ),
              }}
            />
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
              // nextPage={() =>
              //   setCategoryStartingAfter(
              //     login.user_token,
              //     category,
              //     parseInt(category.statingAfter) + parseInt(category.limit)
              //   )
              // }
              // previousPage={() =>
              //   setCategoryStartingAfter(
              //     login.user_token,
              //     category,
              //     parseInt(category.statingAfter) - parseInt(category.limit)
              //   )
              // }
              // setLimit={(event) =>
              //   setCategoryLimit(login.user_token, category, event)
              // }
            />
          </Grid>
        </Grid>
      </Grid>
      {meta.metaEdit && <EditCategoryMeta {...props} />}
    </>
  );
}

export default CategoryMetaComp;
