import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import StatusMode from "components/UI/StatusMode";
import Table from "components/UI/Table";
import Pagination from "components/UI/Pagination";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AddIcon from "@mui/icons-material/Add";

function AttributeComp(props) {
  const columns = [
    {
      field: "prompt",
      headerName: "ATTRIBUTE PROMPT",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "ATTRIBUTE CODE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "image",
      headerName: "ATTRIBUTE IMAGE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
      renderCell: (params) =>
        !params.row.image &&
        params.row.image !== null &&
        params.row.image !== "" ? (
          "Non"
        ) : (
          <Avatar
            src={params.row.image}
            variant="rounded"
            sx={{ mx: "auto", p: 0.5 }}
          />
        ),
    },
    {
      field: "attr_type",
      headerName: "ATTRIBUTE TYPE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "label",
      headerName: "LABEL",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "labelcode",
      headerName: "LABEL CODE",
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
          <IconButton size="small" onClick={() => setAttributeEdit(params.row)}>
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const {
    setAttributePrompt,
    setAttributeCode,
    setAttributeEdit,
    resetAttribute,
    updateAttribute,
    viewAttribute,
    addAttribute,
    uploadCSV,
    exportCSV,
    universal,
    login,
    attribute,
    setAttributeLabel,
    setAttributeLabelCode,
    setAttributeImage,
    setAttributeType,
    assignAttribute,
    unassignAttribute,
  } = props;

  React.useEffect(() => {
    viewAttribute(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Global Attribute
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ bgcolor: "#e9ecef" }}
        >
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE PROMPT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                LABEL
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                LABEL CODE
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
              placeholder="Attribute prompt"
              value={attribute.prompt}
              onChange={(event) => setAttributePrompt(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Attribute code"
              value={attribute.code}
              onChange={(event) => setAttributeCode(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Label"
              value={attribute.label}
              onChange={(event) => setAttributeLabel(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Label code"
              value={attribute.labelCode}
              onChange={(event) => setAttributeLabelCode(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={10}
          container
          justifyContent="center"
          sx={{ bgcolor: "#e9ecef" }}
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE IMAGE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE TYPE
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{ bgcolor: "#e9ecef" }} />
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Attribute image"
              value={attribute.image}
              onChange={(event) => setAttributeImage(event.target.value)}
            />
            <label htmlFor="attribute-images" style={{ padding: 0 }}>
              <input
                accept="image/*"
                id="attribute-images"
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
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              select
              label="Attribute type"
              value={attribute.type}
              onChange={(event) => setAttributeType(event.target.value)}
            >
              {[
                { code: "checkBox", label: "checkbox" },
                { code: "radioButton", label: "radio Button" },
                { code: "dropdownList", label: "Dropdown list" },
                { code: "textBox", label: "Textbox" },
                { code: "textArea", label: "Text Area" },
              ].map((data, index) => (
                <MenuItem value={data.code} key={index}>
                  {data.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            {attribute.editAttribute ? (
              <Button
                sx={{ mr: 1 }}
                variant="contained"
                color="info"
                onClick={() =>
                  updateAttribute(login.user_token, attribute, universal)
                }
              >
                Update
              </Button>
            ) : (
              <Button
                sx={{ mr: 1 }}
                startIcon={<AddIcon />}
                color="info"
                variant="contained"
                onClick={() =>
                  addAttribute(login.user_token, attribute, universal)
                }
              >
                ADD
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => resetAttribute()}
            >
              RESET
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Attribute List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            CallBack={() => viewAttribute(login.user_token, universal)}
            searchBy={"Attributes"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => assignAttribute(login.user_token, universal)}
            >
              ASSIGNED
            </Button>
            <Box sx={{ mx: 2 }}>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => unassignAttribute(login.user_token, universal)}
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

export default AttributeComp;
