import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AddIcon from "@mui/icons-material/Add";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import AllGlobalAttribute from "components/UI/allGlobalAttribute";
import LocalAttributeTable from "components/aogproviderfe/product/addProduct/localAttributes/localAttributeTable";
import GlobalAttributeTable from "components/aogproviderfe/product/addProduct/localAttributes/globalAttributeTable";
import { useSelector, useDispatch } from "react-redux";
import { setLoader, unsetLoader, setSnackBar } from "actions/universal";
import UNIVERSAL from "@/config";

function LocalAttributes(props) {
  const { product, onClose, setProduct } = props;
  const [attribute, setAttribute] = React.useState({
    prompt: "",
    code: "",
    image: "",
    attrType: "",
    required: false,
    attributeId: "",
    attributeIndex: 0,
    editAttribute: false,
    localAttribute: [],
    globalAttribute: "",
    globalAttributeIds: [],
  });

  const login = useSelector((store) => store.loginReducer);

  const dispatch = useDispatch();

  async function addAttribute() {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL + "admin/api/local_attributes/add_local_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          product_id: product.productId,
          prompt: attribute.prompt,
          code: attribute.code,
          image: attribute.image,
          attr_type: attribute.attrType,
          required: attribute.required,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          viewLocalAttribute();
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  }

  async function deleteAttribute(_id) {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL + "admin/api/local_attributes/delete_local_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          attribute_id: _id,
          product_id: product.productId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          viewLocalAttribute();
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  }

  async function editAttribute() {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL + "admin/api/local_attributes/edit_local_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          prompt: attribute.prompt,
          code: attribute.code,
          image: attribute.image,
          attr_type: attribute.attrType,
          required: attribute.required,
          attribute_id: attribute.attributeId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          viewLocalAttribute();
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  }

  async function viewLocalAttribute() {
    await fetch(
      UNIVERSAL.BASEURL + "admin/api/product/view_global_local_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          product_id: product.productId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setAttribute({
            ...attribute,
            prompt: "",
            code: "",
            image: "",
            attrType: "",
            required: false,
            attributeId: "",
            attributeIndex: 0,
            editAttribute: false,
            globalAttributeIds: responseJson.result.global_attribute,
            localAttribute: responseJson.result.local_attributes,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function viewGlobalAttribute() {
    await fetch(
      UNIVERSAL.BASEURL + "admin/api/attributes/view_global_attribute_product",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          attribute_ids: product.globalAttribute,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setAttribute({
            ...attribute,
            globalAttribute: "",
            globalAttributeIds: responseJson.result,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function deleteGlobalAttribute(_id) {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL +
        "admin/api/attributes/delete_global_attribute_product",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          attribute_id: _id,
          product_id: product.productId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          viewLocalAttribute();
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  }

  async function addGlobalAttribute() {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL + "admin/api/attributes/add_product_global_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          global_attribute_id: attribute.globalAttribute,
          product_id: product.productId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        } else {
          dispatch(
            setSnackBar({
              status: responseJson.status,
              message: responseJson.message,
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(unsetLoader());
      });
  }

  React.useEffect(() => {
    if (product.productId !== "") viewLocalAttribute();
  }, [product.globalAttribute]);

  React.useEffect(() => {
    if (product.globalAttribute.length && product.productId === "") {
      viewGlobalAttribute();
    }
  }, [product.globalAttribute]);

  const handelAdd = () => {
    let data = [...product.localAttribute];
    data.push({
      prompt: attribute.prompt,
      code: attribute.code,
      image: attribute.image,
      attr_type: attribute.attrType,
      attr_options: [],
      required: attribute.required,
    });
    setProduct({
      ...product,
      localAttribute: data,
    });
    setAttribute({
      ...attribute,
      prompt: "",
      code: "",
      image: "",
      attrType: "",
      required: false,
    });
  };

  const handelUpdate = () => {
    let data = [...product.localAttribute];
    data.splice(attribute.attributeIndex, 1, {
      prompt: attribute.prompt,
      code: attribute.code,
      image: attribute.image,
      attr_type: attribute.attrType,
      attr_options: [],
      required: attribute.required,
    });
    setProduct({
      ...product,
      localAttribute: data,
    });
    setAttribute({
      ...attribute,
      prompt: "",
      code: "",
      image: "",
      attrType: "",
      attributeIndex: 0,
      required: false,
    });
  };

  const handelGlobalAdd = () => {
    let data = [...product.globalAttribute];
    const check = data.find((item) => item === attribute.globalAttribute);

    if (check) {
      setAttribute({
        ...attribute,
        globalAttribute: "",
      });
    } else {
      data.push(attribute.globalAttribute);
      setProduct({
        ...product,
        globalAttribute: data,
      });
      product.productId !== "" && addGlobalAttribute();
      product.productId !== "" &&
        setAttribute({
          ...attribute,
          globalAttribute: "",
        });
    }
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={product.editLocalAttribute}
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
                Local Attribute List
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
                  { code: "checkBox", label: "CheckBox" },
                  { code: "radioButton", label: "Radio Button" },
                  { code: "dropdownList", label: "Dropdown List" },
                  { code: "textBox", label: "TextBox" },
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
                product.productId === "" ? (
                  <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    color="info"
                    onClick={() => handelUpdate()}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    color="info"
                    onClick={() => editAttribute()}
                  >
                    Update
                  </Button>
                )
              ) : product.productId === "" ? (
                <Button
                  sx={{ mr: 1 }}
                  startIcon={<AddIcon />}
                  color="info"
                  variant="contained"
                  onClick={() => handelAdd()}
                >
                  ADD
                </Button>
              ) : (
                <Button
                  sx={{ mr: 1 }}
                  startIcon={<AddIcon />}
                  color="info"
                  variant="contained"
                  onClick={() => addAttribute()}
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
                    attributeIndex: 0,
                    editAttribute: false,
                  })
                }
              >
                RESET
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ mt: 2 }}>
              <LocalAttributeTable
                product={product}
                setProduct={setProduct}
                viewLocalAttribute={viewLocalAttribute}
                attribute={attribute}
                setAttribute={setAttribute}
                deleteAttribute={deleteAttribute}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ p: 1, mt: 4 }}>
              <AllGlobalAttribute
                value={attribute.globalAttribute}
                onChange={(event) =>
                  setAttribute({ ...attribute, globalAttribute: event })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ p: 1, mt: 4 }}>
              <Button
                startIcon={<AddIcon />}
                color="info"
                variant="contained"
                size="large"
                sx={{ height: 55 }}
                fullWidth
                disabled={attribute.globalAttribute === ""}
                onClick={() => handelGlobalAdd()}
              >
                ADD
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
                Global Attribute List
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <GlobalAttributeTable
                attribute={attribute}
                setAttribute={setAttribute}
                product={product}
                setProduct={setProduct}
                viewGlobalAttribute={viewGlobalAttribute}
                deleteGlobalAttribute={deleteGlobalAttribute}
              />
            </Box>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}

export default LocalAttributes;
