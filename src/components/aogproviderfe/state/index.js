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
import EditState from "./editState";
import Table from "../../UI/Table";
import Pagination from "../../UI/Pagination";

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

function StateComp(props) {
  const columns = [
    {
      field: "state_nm",
      headerName: "STATE NAME",
      flex: 1,
      minWidth: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "STATE CODE",
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
            onClick={() => props.setEditState(params.row)}
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
    props.viewState(
      props.login.user_token,
      props.state.startingAfter,
      props.state.limit,
      props.state.stateKeyWord
    );
  }, [props.login.user_token]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add State
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                STATE NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                STATE CODE
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
              placeholder="State name"
              value={props.state.stateName}
              onChange={(event) => props.setStateName(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="State code"
              value={props.state.stateCode}
              onChange={(event) => props.setStateCode(event.target.value)}
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
                props.addState(props.login.user_token, props.state)
              }
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              State List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <TextField
              size="small"
              fullWidth
              color="primary"
              placeholder="Search by State"
              value={props.state.stateKeyWord}
              onChange={(event) => props.setSearchKeyWord(event.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      props.viewState(
                        props.login.user_token,
                        props.state.startingAfter,
                        props.state.limit,
                        props.state.stateKeyWord
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
                props.assignedState(props.login.user_token, props.state)
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
                  props.unassignedState(props.login.user_token, props.state)
                }
              >
                UNASSIGNED
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            rows={props.state.stateStore}
            columns={columns}
            selectionModel={props.state.stateAssign}
            onSelectionModelChange={(row) => props.setStateAssignUnassing(row)}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination
              startingAfter={props.state.startingAfter}
              total={props.state.total}
              limit={props.state.limit}
              nextPage={() =>
                props.setStateStartingAfter(
                  props.login.user_token,
                  props.state,
                  parseInt(props.state.startingAfter) +
                    parseInt(props.state.limit)
                )
              }
              previousPage={() =>
                props.setStateStartingAfter(
                  props.login.user_token,
                  props.state,
                  parseInt(props.state.startingAfter) -
                    parseInt(props.state.limit)
                )
              }
              setLimit={(event) =>
                props.setStateLimit(
                  props.login.user_token,
                  props.state,
                  event.target.value
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {props.state.editState && <EditState {...props} />}
    </>
  );
}

export default StateComp;
