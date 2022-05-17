import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import { useSelector } from "react-redux";
import UNIVERSAL from "@/config/";
import Table from "components/UI/Table";
import StatusMode from "components/UI/StatusMode";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";

function Categories(props) {
  const { addProduct, product, onClose, setProduct } = props;

  const login = useSelector((store) => store.loginReducer);

  const [pagination, setPagination] = React.useState({
    startingAfter: 0,
    limit: 10,
    total: 0,
    searchKeyword: "",
    categories: [],
    assignUnassignedStore: [],
  });

  async function viewCategory() {
    fetch(UNIVERSAL.BASEURL + "admin/api/category/view_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: login.user_token,
        startingAfter: pagination.startingAfter,
        limit: pagination.limit,
        searchKeyWord: pagination.searchKeyword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setPagination({
            ...pagination,
            categories: responseJson.result,
            total: responseJson.total,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    viewCategory();
  }, [pagination.startingAfter, pagination.limit]);

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
        <StatusMode
          active={
            product.categoryIds.length > 0 &&
            product.categoryIds.find((item) => item === params.row._id)
              ? true
              : false
          }
        />
      ),
    },
  ];

  return (
    <Drawer
      anchor={"right"}
      open={product.editCategories}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "78%",
          overflowY: "scroll",
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      translate={"yes"}
      hideBackdrop={true}
      elevation={0}
    >
      <Box sx={{ height: 17, bgcolor: "#f7f8fa" }}></Box>
      <Grid container justifyContent={"center"}>
        <Grid item xs={11}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Category List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ m: 2 }}>
            <IconButton onClick={() => onClose()}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder={`Search by Category`}
              value={pagination.searchKeyword}
              onChange={(event) =>
                setPagination({
                  ...pagination,
                  searchKeyword: event.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => viewCategory()}
                  >
                    Search
                  </Button>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 2, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() =>
                setProduct({
                  ...product,
                  categoryIds: pagination.assignUnassignedStore,
                  assignUnassignedStore: [],
                })
              }
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() =>
                  setProduct({
                    ...product,
                    categoryIds: [],
                    assignUnassignedStore: [],
                  })
                }
              >
                UNASSIGNED
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            columns={columns}
            selectionModel={pagination.assignUnassignedStore}
            rows={pagination.categories}
            onSelectionModelChange={(row) =>
              setPagination({ ...pagination, assignUnassignedStore: row })
            }
          />
        </Grid>
        <Grid container item xs={12} sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12}>
            <Box
              sx={{
                ml: "auto",
                width: "fit-content",
                my: 2,
                px: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pagination
                count={parseInt(pagination.total / pagination.limit) + 1}
                hideNextButton={false}
                hidePrevButton={false}
                showFirstButton={false}
                showLastButton={false}
                page={parseInt(pagination.startingAfter / pagination.limit) + 1}
                shape="circular"
                siblingCount={1}
                variant="outlined"
                color="secondary"
                onChange={(event, page) =>
                  setPagination({
                    ...pagination,
                    startingAfter: parseInt(pagination.limit) * (page - 1),
                  })
                }
              />
              <Box sx={{ bgcolor: "#ffffff", ml: 2 }}>
                <TextField
                  value={pagination.limit}
                  select
                  onChange={(event) =>
                    setPagination({
                      ...pagination,
                      limit: event.target.value,
                    })
                  }
                  color="secondary"
                  size="small"
                >
                  {[5, 10, 15, 20].map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Categories;
