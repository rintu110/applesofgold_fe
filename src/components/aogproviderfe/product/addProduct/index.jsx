import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "components/UI/TextField";
import Button from "components/UI/Button";
import AllShippingMessage from "components/UI/allShippingMessage";
import AllCountry from "components/UI/allCountry";
import Categories from "components/aogproviderfe/product/addProduct/categories";
import RelatedProducts from "components/aogproviderfe/product/addProduct/relatedProducts";
import LocalAttributes from "components/aogproviderfe/product/addProduct/localAttributes";

function AddProduct(props) {
  const { addProductProps, onClose, addProduct, updateProduct } = props;

  const editorRef = React.useRef();
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const { CKEditor, DecoupledEditor } = editorRef.current || {};

  React.useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
    };
    setEditorLoaded(true);
  }, []);

  const check = React.useMemo(
    () =>
      addProductProps.product !== null &&
      addProductProps.product !== undefined &&
      addProductProps.product !== ""
        ? true
        : false,
    [addProductProps.product]
  );

  const [product, setProduct] = React.useState({
    productName: check ? addProductProps.product.product_name : "",
    code: check ? addProductProps.product.code : "",
    sku: check ? addProductProps.product.sku : "",
    msrp: check ? addProductProps.product.msrp : "",
    price: check ? addProductProps.product.price : "",
    description: check ? addProductProps.product.description : "",
    countryId: check ? addProductProps.product.country_id : null,
    gender: check ? addProductProps.product.gender : "",
    metaltype: check ? addProductProps.product.metaltype : "",
    weight: check ? addProductProps.product.weight : "",
    quantity: check ? addProductProps.product.quantity : "",
    thumbnailImage: check ? addProductProps.product.thumbnail_image : "",
    closeupImage: check ? addProductProps.product.closeup_image : "",
    alternativeImages: check
      ? addProductProps.product.alternative_images
      : ["", "", "", "", ""],
    shippingMessageId: check
      ? addProductProps.product.shipping_message_id
      : null,
    relatedProductIds: check ? addProductProps.product.related_product_ids : [],
    categoryIds: check ? addProductProps.product.category_ids : [],
    localAttribute: check ? addProductProps.product.local_attribute : [],
    globalAttribute: check ? addProductProps.product.global_attribute_ids : [],
    productId: check ? addProductProps.product._id : "",
    editCategories: false,
    editRelatedProduct: false,
    editLocalAttribute: false,
  });

  const setAlternativeImage = (event, index) => {
    let data = [...product.alternativeImages];
    data[index] = event;

    setProduct({
      ...product,
      alternativeImages: data,
    });
  };

  const addMoreAlternativeImage = () => {
    let data = [...product.alternativeImages];
    data.push("");
    setProduct({
      ...product,
      alternativeImages: data,
    });
  };

  const removeAlternativeImage = (index) => {
    let data = [...product.alternativeImages];
    data.splice(index, 1);
    setProduct({
      ...product,
      alternativeImages: data,
    });
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={addProductProps.open}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "78%",
          },
        }}
        translate={"yes"}
        hideBackdrop={true}
        elevation={0}
        disableEnforceFocus
      >
        <Box sx={{ height: 14, bgcolor: "#f7f8fa", pt: 2 }}></Box>
        <Grid container justifyContent={"center"}>
          <Grid item xs={11}>
            <Box sx={{ m: 2 }}>
              <Typography variant="h6" sx={{ color: "#32325d", width: "100%" }}>
                {addProductProps.title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ m: 2, ml: "auto", width: "fit-content" }}>
              <IconButton onClick={() => onClose()}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <TextField
                fullWidth
                color="secondary"
                label="Name"
                value={product.productName}
                onChange={(event) =>
                  setProduct({ ...product, productName: event.target.value })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <TextField
                fullWidth
                color="secondary"
                label="Sku"
                value={product.sku}
                onChange={(event) =>
                  setProduct({ ...product, sku: event.target.value })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <TextField
                fullWidth
                color="secondary"
                label="Price"
                value={product.price}
                onChange={(event) =>
                  setProduct({ ...product, price: event.target.value })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1, height: 260 }}>
              {editorLoaded ? (
                <CKEditor
                  editor={DecoupledEditor}
                  config={{
                    placeholder: "Description",
                    toolbar: {
                      items: [
                        "heading",
                        "|",
                        "fontfamily",
                        "fontsize",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "|",
                        "alignment",
                        "|",
                        "numberedList",
                        "bulletedList",
                        "|",
                        "outdent",
                        "indent",
                        "|",
                        "link",
                        "blockquote",
                        "insertTable",
                        "|",
                        "undo",
                        "redo",
                      ],
                    },
                  }}
                  data={product.description}
                  onReady={(editor) => {
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );
                  }}
                  onChange={(event, editor) => {
                    setProduct({ ...product, description: editor.getData() });
                  }}
                />
              ) : (
                "Editor is loading........"
              )}
            </Box>
          </Grid>
          <Grid container item xs={12} md={6} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ m: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    color="secondary"
                    label="MSRP"
                    value={product.msrp}
                    onChange={(event) =>
                      setProduct({ ...product, msrp: event.target.value })
                    }
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    color="secondary"
                    label="Quantity"
                    value={product.quantity}
                    onChange={(event) =>
                      setProduct({ ...product, quantity: event.target.value })
                    }
                  />
                </Box>
                <Box sx={{ mb: 1 }}>
                  <AllCountry
                    onChange={(event) =>
                      setProduct({ ...product, countryId: event })
                    }
                    value={product.countryId}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ m: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    color="secondary"
                    label="Gender"
                    select
                    value={product.gender}
                    onChange={(event) =>
                      setProduct({ ...product, gender: event.target.value })
                    }
                  >
                    {["male", "female", "other"].map((item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    color="secondary"
                    label="Metal Type"
                    value={product.metaltype}
                    onChange={(event) =>
                      setProduct({ ...product, metaltype: event.target.value })
                    }
                  />
                </Box>
                <Box sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    color="secondary"
                    label="Weight"
                    value={product.weight}
                    onChange={(event) =>
                      setProduct({ ...product, weight: event.target.value })
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ mx: 1, mb: 1 }}>
                <AllShippingMessage
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      shippingMessageId: event,
                    })
                  }
                  value={product.shippingMessageId}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {product.alternativeImages.length > 0 &&
              product.alternativeImages.map((item, index) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    mx: 1,
                    bgcolor: "#f3f3f3",
                    border: "dashed 1px #adadad",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                  key={index}
                >
                  <Box>
                    <Avatar variant="rounded" sx={{ height: 55, width: 55 }}>
                      <PermMediaIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      label={`Alternative Image ${index + 1}`}
                      fullWidth
                      color="secondary"
                      sx={{ bgcolor: "#fff" }}
                      size="medium"
                      value={item}
                      onChange={(event) =>
                        setAlternativeImage(event.target.value, index)
                      }
                    />
                  </Box>
                  <Box sx={{ height: "100%" }}>
                    <label htmlFor="closeup-images" style={{ padding: 0 }}>
                      <input
                        accept="image/*"
                        id="closeup-images"
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
                      <Button
                        color="secondary"
                        variant="contained"
                        component="span"
                        size="large"
                      >
                        <Avatar
                          variant="rounded"
                          sx={{ height: 40, width: 40, bgcolor: "#5e72e4" }}
                        >
                          <PermMediaIcon fontSize="small" />
                        </Avatar>
                      </Button>
                    </label>
                  </Box>
                  <Box sx={{ mx: 2 }}>
                    <Avatar
                      src={item}
                      alt={index}
                      variant="rounded"
                      sx={{ height: 55, width: 55 }}
                    />
                  </Box>
                  <Box sx={{ ml: "auto", width: "fit-content" }}>
                    <IconButton onClick={() => removeAlternativeImage(index)}>
                      <HighlightOffIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                mx: 1,
                bgcolor: "#f3f3f3",
                border: "dashed 1px #adadad",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: "52%" }}>
                <Button
                  color="info"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<AddCircleIcon />}
                  onClick={() => addMoreAlternativeImage()}
                >
                  Add More Alternative Images
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                mx: 1,
                bgcolor: "#f3f3f3",
                border: "dashed 1px #adadad",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Box sx={{ mt: 0.5 }}>
                <Avatar variant="rounded" sx={{ height: 56, width: 56 }}>
                  <PermMediaIcon fontSize="small" />
                </Avatar>
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="Thumnail Image"
                  fullWidth
                  color="secondary"
                  margin="dense"
                  value={product.thumbnailImage}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      thumbnailImage: event.target.value,
                    })
                  }
                />
              </Box>
              <Box sx={{ height: "100%", mt: 0.5 }}>
                <label htmlFor="thumbnail-images" style={{ padding: 0 }}>
                  <input
                    accept="image/*"
                    id="thumbnail-images"
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
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    size="large"
                  >
                    <Avatar
                      variant="rounded"
                      sx={{ height: 40, width: 40, bgcolor: "#5e72e4" }}
                    >
                      <PermMediaIcon fontSize="small" />
                    </Avatar>
                  </Button>
                </label>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Avatar
                  src={product.thumbnailImage}
                  alt={"ThumbnailImage"}
                  variant="rounded"
                  sx={{ height: 55, width: 55 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: 1,
                bgcolor: "#f3f3f3",
                border: "dashed 1px #adadad",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Box sx={{ mt: 0.5 }}>
                <Avatar variant="rounded" sx={{ height: 56, width: 56 }}>
                  <PermMediaIcon fontSize="small" />
                </Avatar>
              </Box>
              <Box sx={{ width: "100%" }}>
                <TextField
                  label="CloseUp Image"
                  fullWidth
                  color="secondary"
                  margin="dense"
                  value={product.closeupImage}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      closeupImage: event.target.value,
                    })
                  }
                />
              </Box>
              <Box sx={{ height: "100%", mt: 0.5 }}>
                <label htmlFor="closeup-images" style={{ padding: 0 }}>
                  <input
                    accept="image/*"
                    id="closeup-images"
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
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    size="large"
                  >
                    <Avatar
                      variant="rounded"
                      sx={{ height: 40, width: 40, bgcolor: "#5e72e4" }}
                    >
                      <PermMediaIcon fontSize="small" />
                    </Avatar>
                  </Button>
                </label>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Avatar
                  src={product.closeupImage}
                  alt={"CloseupImage"}
                  variant="rounded"
                  sx={{ height: 55, width: 55 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Button
                color="info"
                fullWidth
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() =>
                  setProduct({
                    ...product,
                    editCategories: true,
                  })
                }
              >
                Categories
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Button
                color="info"
                fullWidth
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={() =>
                  setProduct({
                    ...product,
                    editRelatedProduct: true,
                  })
                }
              >
                Related Products
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              <Button
                color="info"
                fullWidth
                variant="contained"
                onClick={() =>
                  setProduct({
                    ...product,
                    editLocalAttribute: true,
                  })
                }
                startIcon={<AddCircleIcon />}
              >
                Local Attribute
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ m: 1 }}>
              {product.productId === "" ? (
                <Button
                  color="info"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    addProduct(
                      props.login.user_token,
                      product,
                      props.universal,
                      (status) => {
                        if (status) {
                          onClose();
                        }
                      }
                    )
                  }
                  startIcon={<AddCircleIcon />}
                >
                  Add Product
                </Button>
              ) : (
                <Button
                  color="info"
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    updateProduct(
                      props.login.user_token,
                      product,
                      props.universal,
                      (status) => {
                        if (status) {
                          onClose();
                        }
                      }
                    )
                  }
                >
                  Update Product
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ height: 14, bgcolor: "#f7f8fa", pb: 2 }}></Box>
      </Drawer>
      {product.editCategories && (
        <Categories
          product={product}
          onClose={() =>
            setProduct({
              ...product,
              editCategories: false,
            })
          }
          setProduct={setProduct}
        />
      )}
      {product.editRelatedProduct && (
        <RelatedProducts
          product={product}
          onClose={() =>
            setProduct({
              ...product,
              editRelatedProduct: false,
            })
          }
          setProduct={setProduct}
        />
      )}
      {product.editLocalAttribute && (
        <LocalAttributes
          product={product}
          onClose={() =>
            setProduct({
              ...product,
              editLocalAttribute: false,
            })
          }
          setProduct={setProduct}
        />
      )}
    </>
  );
}

export default AddProduct;
