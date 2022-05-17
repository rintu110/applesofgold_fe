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
import DeleteIcon from "@mui/icons-material/Delete";

function CountryComp(props) {
  const [country, setCountryData] = React.useState({
    countryName: "",
    countryCode: "",
    countryId: "",
    editCountry: false,
  });

  const {
    viewCountry,
    addCountry,
    unassignedCountry,
    assignedCountry,
    deleteCountry,
    updateCountry,
    uploadCSV,
    exportCSV,
    login,
    universal,
  } = props;

  const columns = [
    {
      field: "country_nm",
      headerName: "COUNTRY NAME",
      flex: 1,
      minWidth: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "COUNTRY CODE",
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
              setCountryData({
                ...country,
                countryName: params.row.country_nm,
                countryCode: params.row.code,
                countryId: params.row._id,
                editCountry: true,
              })
            }
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
          <IconButton
            onClick={() =>
              deleteCountry(login.user_token, params.row._id, universal)
            }
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const reset = () => {
    setCountryData({
      ...country,
      countryName: "",
      countryCode: "",
      countryId: "",
      editCountry: false,
    });
  };

  React.useEffect(() => {
    viewCountry(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Country
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Country name"
              value={country.countryName}
              onChange={(event) =>
                setCountryData({ ...country, countryName: event.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Country code"
              value={country.countryCode}
              onChange={(event) =>
                setCountryData({ ...country, countryCode: event.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            {country.editCountry ? (
              <Button
                variant="contained"
                color="info"
                sx={{ mr: 1 }}
                onClick={() =>
                  updateCountry(
                    login.user_token,
                    country,
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
                  addCountry(
                    login.user_token,
                    country,
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
              Country List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            CallBack={() => viewCountry(login.user_token, universal)}
            searchBy={"Country"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => assignedCountry(login.user_token, universal)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignedCountry(login.user_token, universal)}
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
    </>
  );
}

export default CountryComp;
