import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import Pagination from "components/UI/Pagination";
import Search from "components/UI/Search";
import CSVFileUpload from "components/UI/CsvFileUpload";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AddIcon from "@mui/icons-material/Add";
import AttributeTable from "components/aogproviderfe/attribute/attributeTable";

function AttributeComp(props) {
  const [attribute, setAttribute] = React.useState({
    prompt: "",
    code: "",
    image: "",
    attrType: "",
    required: false,
    attributeId: "",
    editAttribute: false,
  });

  const {
    updateAttribute,
    viewAttribute,
    addAttribute,
    uploadCSV,
    exportCSV,
    universal,
    login,
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
          <Grid item xs={12} md={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE PROMPT
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE CODE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE IMAGE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                ATTRIBUTE TYPE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ m: 1 }}>
              <Typography variant="body1" sx={{ color: "#8898aa" }}>
                REQUIRED
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Attribute prompt"
              value={attribute.prompt}
              onChange={(event) =>
                setAttribute({ ...attribute, prompt: event.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Attribute code"
              value={attribute.code}
              onChange={(event) =>
                setAttribute({ ...attribute, code: event.target.value })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ m: 1, display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              placeholder="Attribute image"
              value={attribute.image}
              onChange={(event) =>
                setAttribute({ ...attribute, image: event.target.value })
              }
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
        <Grid item xs={12} md={2}>
          <Box sx={{ m: 1 }}>
            <TextField
              size="small"
              fullWidth
              color="secondary"
              select
              label="Attribute type"
              value={attribute.attrType}
              onChange={(event) =>
                setAttribute({ ...attribute, attrType: event.target.value })
              }
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
        <Grid item xs={12} md={1}>
          <Box sx={{ m: 1, textAlign: "center" }}>
            <Checkbox
              color="secondary"
              checked={attribute.required}
              onChange={(event) =>
                setAttribute({ ...attribute, required: event.target.checked })
              }
            />
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
                  updateAttribute(
                    login.user_token,
                    attribute,
                    universal,
                    (status) => {
                      if (status) {
                        setAttribute({
                          ...attribute,
                          prompt: "",
                          code: "",
                          image: "",
                          attrType: "",
                          required: false,
                          attributeId: "",
                          editAttribute: false,
                        });
                      }
                    }
                  )
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
                  addAttribute(
                    login.user_token,
                    attribute,
                    universal,
                    (status) => {
                      if (status) {
                        setAttribute({
                          ...attribute,
                          prompt: "",
                          code: "",
                          image: "",
                          attrType: "",
                          required: false,
                          attributeId: "",
                          editAttribute: false,
                        });
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
              onClick={() =>
                setAttribute({
                  ...attribute,
                  prompt: "",
                  code: "",
                  image: "",
                  attrType: "",
                  required: false,
                  attributeId: "",
                  editAttribute: false,
                })
              }
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
          <AttributeTable
            {...props}
            {...attribute}
            setAttribute={setAttribute}
          />
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
