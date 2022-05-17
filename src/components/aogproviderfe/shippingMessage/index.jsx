import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import StatusMode from "components/UI/StatusMode";
import Table from "components/UI/Table";
import Pagination from "components/UI/Pagination";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import AddIcon from "@mui/icons-material/Add";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

function ShippingMessageComp(props) {
  const [shipping, setShippingData] = React.useState({
    shippingMessage: "",
    shippingCode: "",
    shippingFree: "",
    shippingDays: "",
    shippingId: "",
    shippingOrder: "",
    countryMessage: "",
    countryFlag: "",
    editShipping: false,
  });

  const reset = () => {
    setShippingData({
      ...shipping,
      shippingMessage: "",
      shippingCode: "",
      shippingFree: "",
      shippingDays: "",
      shippingId: "",
      shippingOrder: "",
      countryMessage: "",
      countryFlag: "",
      editShipping: false,
    });
  };

  const {
    viewShippingMessage,
    addShippingMessage,
    unassignedShippingMessage,
    assignedShippingMessage,
    updateShippingMessage,
    deleteShippingMessage,
    uploadCSV,
    exportCSV,
    login,
    universal,
  } = props;

  const columns = [
    {
      field: "code",
      headerName: "CODE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "shipping_message",
      headerName: "MESSAGE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "shipping_free",
      headerName: "FREE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "shipping_order",
      headerName: "ORDER",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "country_message",
      headerName: "MESSAGE",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) =>
        params.row.country_message === "" || params.row.country_message === null
          ? "Non"
          : params.row.country_message,
    },
    {
      field: "country_flag",
      headerName: "FLAG",
      flex: 1,
      width: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) =>
        params.row.country_flag === "" || params.row.country_flag === null ? (
          <Typography variant="body2" sx={{ mx: "auto" }}>
            Non
          </Typography>
        ) : (
          <Avatar
            src={params.row.country_flag}
            alt="country-flag"
            sx={{ height: 30, width: 60, mx: "auto" }}
            variant="rounded"
          />
        ),
    },
    {
      field: "shipping_days",
      headerName: "TIME",
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
              setShippingData({
                ...shipping,
                shippingMessage: params.row.shipping_message,
                shippingCode: params.row.code,
                shippingFree: params.row.shipping_free,
                shippingDays: params.row.shipping_days,
                shippingId: params.row._id,
                shippingOrder: params.row.shipping_order,
                shippingCountry: params.row.country_id,
                countryMessage: params.row.country_message,
                countryFlag: params.row.country_flag,
                editShipping: true,
              })
            }
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
          <IconButton
            onClick={() =>
              deleteShippingMessage(login.user_token, params.row._id, universal)
            }
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewShippingMessage(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Shipping Message
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                MESSAGE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                FREE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                TIME
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Code"
              value={shipping.shippingCode}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  shippingCode: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Message"
              value={shipping.shippingMessage}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  shippingMessage: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Free"
              value={shipping.shippingFree}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  shippingFree: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Time"
              value={shipping.shippingDays}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  shippingDays: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ORDER
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                COUNTRY FLAG
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                COUNTRY MESSAGE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Order"
              value={shipping.shippingOrder}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  shippingOrder: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Country Flag"
              value={shipping.countryFlag}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  countryFlag: event.target.value,
                })
              }
            />
            <label htmlFor="country-images" style={{ padding: 0 }}>
              <input
                accept="image/*"
                id="country-images"
                type="file"
                style={{ display: "none" }}
                // onChange={(event) =>
                //   uploadCSV(
                //     state.login.user_token,
                //     event.target.files[0],
                //     state.universal
                //   )
                // }
              />
              <Button color="secondary" variant="contained" component="span">
                <PhotoSizeSelectActualIcon />
              </Button>
            </label>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Country Message"
              value={shipping.countryMessage}
              onChange={(event) =>
                setShippingData({
                  ...shipping,
                  countryMessage: event.target.value,
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            {shipping.editShipping ? (
              <Button
                variant="contained"
                color="info"
                sx={{ mr: 1 }}
                onClick={() =>
                  updateShippingMessage(
                    login.user_token,
                    shipping,
                    universal,
                    (editstatus) => {
                      if (editstatus) {
                        reset();
                      }
                    }
                  )
                }
              >
                Update
              </Button>
            ) : (
              <Button
                color="info"
                sx={{ mr: 1 }}
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() =>
                  addShippingMessage(
                    login.user_token,
                    shipping,
                    universal,
                    (addstatus) => {
                      if (addstatus) {
                        reset();
                      }
                    }
                  )
                }
              >
                ADD
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => reset()}
            >
              RESET
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Shipping List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            CallBack={() => viewShippingMessage(login.user_token, universal)}
            searchBy={"Shipping"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() =>
                assignedShippingMessage(login.user_token, universal)
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
                  unassignedShippingMessage(login.user_token, universal)
                }
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
          <Grid item xs={12}>
            <Pagination />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ShippingMessageComp;
