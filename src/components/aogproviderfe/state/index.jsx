import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
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

function StateComp(props) {
  const [state, setStateData] = React.useState({
    stateName: "",
    stateCode: "",
    stateId: "",
    editState: false,
  });

  const {
    viewState,
    addState,
    unassignedState,
    assignedState,
    uploadCSV,
    exportCSV,
    deleteState,
    login,
    universal,
    updateState,
  } = props;

  const columns = [
    {
      field: "state_nm",
      headerName: "NAME",
      flex: 1,
      minWidth: 300,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "CODE",
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
              setStateData({
                ...state,
                stateName: params.row.state_nm,
                stateCode: params.row.code,
                stateId: params.row._id,
                editState: true,
              })
            }
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
          <IconButton
            onClick={() =>
              deleteState(login.user_token, params.row._id, universal)
            }
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    viewState(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

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
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                STATE NAME
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                STATE CODE
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
              placeholder="State name"
              value={state.stateName}
              onChange={(event) =>
                setStateData({ ...state, stateName: event.target.value })
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
              placeholder="State code"
              value={state.stateCode}
              onChange={(event) =>
                setStateData({ ...state, stateCode: event.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            {state.editState ? (
              <>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    updateState(
                      login.user_token,
                      state,
                      universal,
                      (updatestatus) => {
                        if (updatestatus) {
                          setStateData({
                            ...state,
                            stateName: "",
                            stateCode: "",
                            stateId: "",
                            editState: false,
                          });
                        }
                      }
                    )
                  }
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                color="info"
                sx={{ mr: 1 }}
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() =>
                  addState(login.user_token, state, universal, (addstatus) => {
                    if (addstatus) {
                      setStateData({
                        ...state,
                        stateName: "",
                        stateCode: "",
                        stateId: "",
                        editState: false,
                      });
                    }
                  })
                }
              >
                ADD
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setStateData({
                  ...state,
                  stateName: "",
                  stateCode: "",
                  stateId: "",
                  editState: false,
                });
              }}
            >
              RESET
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
          <Search
            CallBack={() => viewState(login.user_token, universal)}
            searchBy={"State"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => assignedState(login.user_token, universal)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignedState(login.user_token, universal)}
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

export default StateComp;
