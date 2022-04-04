import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import TextField from "../../UI/TextField";
import Button from "../../UI/Button";
import StatusMode from "../../UI/StatusMode";
import EditCountry from "./editCountry";

const DataGridBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .table-header": {
    backgroundColor: "#e9ecef",
    color: "#8898aa",
    fontSize: 16,
    fontWeight: 300,
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    backgroundColor: "#e9ecef",
  },
  "& .table-row": {
    fontSize: 16,
    color: "#525f7f",
    fontWeight: 200,
  },
}));

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
              color="secondary"
              placeholder="Search by Country"
              value={props.country.countryKeyWord}
              onChange={(event) => props.setSearchKeyWord(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="secondary"
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
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DataGridBox sx={{ height: 450 }}>
            <DataGrid
              rows={props.country.countryStore}
              columns={columns}
              headerHeight={30}
              rowHeight={40}
              selectionModel={props.country.countryAssign}
              checkboxSelection
              disableColumnSelector
              onSelectionModelChange={(row) =>
                props.setCountryAssignUnassing(row)
              }
              hideFooter
              hideFooterSelectedRowCount
              hideFooterPagination
              getRowId={(row) => row._id}
            />
          </DataGridBox>
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                ml: "auto",
                width: "fit-content",
                my: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ backgroundColor: "#FFFFFF" }}>
                displaying {parseInt(props.country.startingAfter) + 1} -{" "}
                {parseInt(props.country.startingAfter) > props.country.total
                  ? props.country.total
                  : parseInt(props.country.limit) +
                    parseInt(props.country.startingAfter)}{" "}
                of {props.country.total}
                <IconButton
                  disabled={props.country.startingAfter === 0}
                  onClick={() =>
                    props.setCountryStartingAfter(
                      props.login.user_token,
                      props.country,
                      parseInt(props.country.startingAfter) -
                        parseInt(props.country.limit)
                    )
                  }
                >
                  <Icon>navigate_before</Icon>
                </IconButton>
                <IconButton
                  disabled={
                    props.country.startingAfter + props.country.limit >=
                    props.country.total
                  }
                  onClick={() =>
                    props.setCountryStartingAfter(
                      props.login.user_token,
                      props.country,
                      parseInt(props.country.startingAfter) +
                        parseInt(props.country.limit)
                    )
                  }
                >
                  <Icon>navigate_next</Icon>
                </IconButton>
              </span>
              <Box sx={{ bgcolor: "#ffffff", ml: 2 }}>
                <TextField
                  value={props.country.limit}
                  select
                  onChange={(event) =>
                    props.setCountryLimit(
                      props.login.user_token,
                      props.country,
                      event.target.value
                    )
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
      {props.country.editCountry && <EditCountry {...props} />}
    </>
  );
}

export default CountryComp;
