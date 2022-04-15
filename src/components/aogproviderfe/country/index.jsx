import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import StatusMode from "components/UI/StatusMode";
import EditCountry from "components/aogproviderfe/country/editCountry";
import Table from "components/UI/Table";
import Pagination from "components/UI/Pagination";

function CountryComp(props) {
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
            onClick={() => props.setEditCountry(params.row)}
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
    props.viewCountry(
      props.login.user_token,
      props.country.startingAfter,
      props.country.limit,
      props.country.countryKeyWord
    );
  }, [props.login.user_token]);

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
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                COUNTRY NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                COUNTRY CODE
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
              placeholder="Country name"
              value={props.country.countryName}
              onChange={(event) => props.setCountryName(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Country code"
              value={props.country.countryCode}
              onChange={(event) => props.setCountryCode(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={() =>
                props.addCountry(props.login.user_token, props.country)
              }
            >
              ADD
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
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by Country"
              value={props.country.countryKeyWord}
              onChange={(event) => props.setSearchKeyWord(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      props.viewCountry(
                        props.login.user_token,
                        props.country.startingAfter,
                        props.country.limit,
                        props.country.countryKeyWord
                      )
                    }
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
              onClick={() =>
                props.assignedCountry(props.login.user_token, props.country)
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
                  props.unassignedCountry(props.login.user_token, props.country)
                }
              >
                UNASSIGNED
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <label htmlFor="state-csv-file">
                <input
                  accept=".csv"
                  id="state-csv-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) =>
                    props.uploadCSV(
                      props.login.user_token,
                      event.target.files[0],
                      props.country
                    )
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
                onClick={() => props.exportCSV(props.login.user_token)}
              >
                Export
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            rows={props.country.countryStore}
            columns={columns}
            selectionModel={props.country.countryAssign}
            onSelectionModelChange={(row) =>
              props.setCountryAssignUnassing(row)
            }
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={props.country.startingAfter}
              total={props.country.total}
              limit={props.country.limit}
              nextPage={() =>
                props.setCountryStartingAfter(
                  props.login.user_token,
                  props.country,
                  parseInt(props.country.startingAfter) +
                    parseInt(props.country.limit)
                )
              }
              previousPage={() =>
                props.setCountryStartingAfter(
                  props.login.user_token,
                  props.country,
                  parseInt(props.country.startingAfter) -
                    parseInt(props.country.limit)
                )
              }
              setLimit={(event) =>
                props.setCountryLimit(
                  props.login.user_token,
                  props.country,
                  event
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {props.country.editCountry && <EditCountry {...props} />}
    </>
  );
}

export default CountryComp;
