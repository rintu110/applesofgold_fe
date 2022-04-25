import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Table from "components/UI/Table";
import Pagination from "components/UI/Pagination";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import EditAttributeOption from "components/aogproviderfe/attributeOption/editAttributeOption";

function AttributeOptionComp(props) {
  const [_id, setValue] = React.useState("");
  const [attributeData, setAttributeData] = React.useState("");
  const {
    setAttributePrompt,
    setAttributeCode,
    setAttributeImage,
    setOptionPrice,
    setOptionCost,
    setAttributeId,
    setEditAttributeOption,
    viewAllAttribute,
    viewAttributeOption,
    addAttributeOption,
    uploadCSV,
    exportCSV,
    attribute,
    login,
    universal,
  } = props;

  React.useEffect(() => {
    viewAttributeOption(login.user_token, universal);
  }, [universal.startingAfter, universal.limit]);

  const columns = [
    {
      field: "prompt",
      headerName: "OPTION PROMPT",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "code",
      headerName: "OPTION CODE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "price",
      headerName: "OPTION PRICE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "cost",
      headerName: "OPTION COST",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
    },
    {
      field: "image",
      headerName: "OPTION IMAGE",
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
      field: "attribute",
      headerName: "ATTRIBUTE",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-row",
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
              setEditAttributeOption(params.row);
              setAttributeData({
                _id: params.row.attr_id,
                label: params.row.attribute,
              });
            }}
          >
            <EditIcon sx={{ fontSize: 14, color: "#03a5fc" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Add Attribute Option
            </Typography>
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                OPTION PROMPT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                OPTION CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                OPTION PRICE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                OPTION COST
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
              placeholder="Option prompt"
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
              placeholder="Option code"
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
              placeholder="Option price"
              value={attribute.price}
              onChange={(event) => setOptionPrice(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Option cost"
              value={attribute.cost}
              onChange={(event) => setOptionCost(event.target.value)}
            />
          </Box>
        </Grid>
        <Grid container justifyContent="center" sx={{ bgcolor: "#e9ecef" }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                OPTION IMAGE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Option image"
              value={attribute.image}
              onChange={(event) => setAttributeImage(event.target.value)}
            />
            <Box sx={{ ml: 1 }}>
              <label htmlFor="attribute-images">
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
                <IconButton size="small" component="span">
                  <CloudUploadIcon sx={{ color: "#03a5fc" }} />
                </IconButton>
              </label>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ m: 1 }}>
            <Autocomplete
              value={_id}
              options={attribute.allAttribute}
              freeSolo
              autoComplete
              isOptionEqualToValue={(option, value) => true}
              onInputChange={(event, value) =>
                value !== null &&
                value !== undefined &&
                value !== "" &&
                viewAllAttribute(login.user_token, value)
              }
              onChange={(event, value) => {
                setValue(value);
                setAttributeId(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  color="secondary"
                  placeholder="Choose Attribute"
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
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            <Button
              color="info"
              fullWidth
              variant="contained"
              onClick={() =>
                addAttributeOption(login.user_token, attribute, universal)
              }
            >
              ADD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ m: 2, mt: 5 }}>
            <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
              Attribute Option List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Search
            CallBack={() => viewAttributeOption(login.user_token, universal)}
            searchBy={"Attribute Option"}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ my: 4, mx: 2, display: "flex", alignItems: "center" }}>
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
          <Table
            rows={universal.store}
            columns={columns}
            disableSelectionOnClick
            checkboxSelection={false}
          />
        </Grid>
        <Grid container sx={{ bgcolor: "#f7f8fa" }}>
          <Grid item xs={12} md={12}>
            <Pagination />
          </Grid>
        </Grid>
      </Grid>
      {attribute.editAttribute && (
        <EditAttributeOption {...props} attributeData={attributeData} />
      )}
    </>
  );
}

export default AttributeOptionComp;
