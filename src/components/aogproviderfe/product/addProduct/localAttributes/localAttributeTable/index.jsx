import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import TextField from "components/UI/TextField";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "components/UI/Button";
import Delete from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { setLoader, unsetLoader, setSnackBar } from "actions/universal";
import UNIVERSAL from "@/config";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Row(props) {
  const {
    row,
    product,
    setProduct,
    index,
    setAttribute,
    attribute,
    deleteAttribute,
    viewLocalAttribute,
    innerRef,
    provided,
    snapshot,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState({
    prompt: "",
    code: "",
    default: false,
    price: "",
    attributeId: "",
    mode: "add",
    open: false,
    attrOptions: row.attr_options ? [...row.attr_options] : [],
  });

  const login = useSelector((store) => store.loginReducer);

  const dispatch = useDispatch();

  async function handelUpdate(_id) {
    dispatch(setLoader());
    fetch(
      UNIVERSAL.BASEURL +
        "admin/api/local_attributes/crud_local_attributes_options",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          attr_options: option.attrOptions,
          attr_id: _id,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setOption({
            ...option,
            prompt: "",
            code: "",
            default: false,
            price: "",
            attributeId: "",
            mode: "",
            open: false,
          });
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

  const handelAdd = (main) => {
    setProduct({
      ...product,
      localAttribute: main,
    });
    setOption({
      ...option,
      prompt: "",
      code: "",
      default: false,
      price: "",
      attributeId: "",
      mode: "add",
      open: false,
    });
  };

  const onSubmit = () => {
    if (option.mode === "add") {
      setOption({
        ...option,
        attrOptions: option.attrOptions.push({
          prompt: option.prompt,
          code: option.code,
          defaults: option.default,
          price: option.price,
        }),
      });
    } else {
      setOption({
        ...option,
        attrOptions: option.attrOptions.splice(
          row.attr_options.findIndex((item) => item.prompt === option.prompt),
          1,
          {
            prompt: option.prompt,
            code: option.code,
            defaults: option.default,
            price: option.price,
          }
        ),
      });
    }

    const main =
      product.productId === ""
        ? [...product.localAttribute]
        : [...attribute.localAttribute];

    main[index].attr_options = option.attrOptions;

    product.productId === ""
      ? handelAdd(main)
      : handelUpdate(option.attributeId);

    setOption({
      ...option,
      prompt: "",
      code: "",
      default: false,
      price: "",
      attributeId: "",
      mode: "add",
      open: false,
    });
  };

  const attributeHandelDelete = (index) => {
    let data = [...product.localAttribute];
    data.splice(index, 1);
    setProduct({
      ...product,
      localAttribute: data,
    });
  };

  const handelDelete = (index, _id) => {
    setOption({
      ...option,
      attrOptions: option.attrOptions.splice(index, 1),
    });

    let main =
      product.productId === ""
        ? [...product.localAttribute]
        : [...attribute.localAttribute];

    main.attr_options = option.attrOptions;

    product.productId === "" ? handelAdd(main) : handelUpdate(_id);
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          bgcolor: snapshot.isDragging ? "#ccffe8" : "#fff",
          display: snapshot.isDragging && "table-row",
        }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <TableCell
          sx={{
            padding: 0,
            px: 2,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%" }
              : "auto",
          }}
        >
          {row.code}
        </TableCell>
        <TableCell
          sx={{
            padding: 0,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%" }
              : "auto",
          }}
        >
          {row.prompt}
        </TableCell>
        <TableCell
          sx={{
            padding: 0,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%" }
              : "auto",
          }}
        >
          {!row.image || row.image === null || row.image === "" ? (
            "Non"
          ) : (
            <Avatar
              src={row.image}
              variant="rounded"
              sx={{ mx: "auto", p: 0.5 }}
            />
          )}
        </TableCell>
        <TableCell
          sx={{
            padding: 0,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%" }
              : "auto",
          }}
        >
          {row.attr_type}
        </TableCell>
        <TableCell
          sx={{
            padding: 0,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%", xl: "18.5%" }
              : "auto",
          }}
        >
          <Checkbox color="secondary" checked={row.required} />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            padding: 0,
            width: snapshot.isDragging
              ? { sm: "auto", md: "15%", lg: "18%", xl: "auto" }
              : 150,
          }}
        >
          <IconButton
            size="small"
            onClick={() =>
              setAttribute({
                ...attribute,
                prompt: row.prompt,
                code: row.code,
                image: row.image,
                attrType: row.attr_type,
                required: row.required,
                attributeId: row._id,
                editAttribute: true,
              })
            }
          >
            <EditIcon sx={{ color: "#03a5fc" }} />
          </IconButton>
          <IconButton
            onClick={() =>
              product.productId === ""
                ? attributeHandelDelete(index)
                : deleteAttribute(row._id)
            }
          >
            <Delete color="error" />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 1, mx: 4 }}>
              <Box sx={{ width: "100%", mb: 2 }}>
                <Grid
                  container
                  justifyContent={"center"}
                  columnSpacing={{ sm: 0, md: 2 }}
                >
                  <Grid item xs={12}>
                    <Box sx={{ my: 2 }}>
                      <Typography variant="body2">
                        {option.mode === "add"
                          ? "ADD ATTRIBUTE OPTION"
                          : "EDIT ATTRIBUTE OPTION"}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      size="small"
                      label="Prompt"
                      fullWidth
                      value={option.prompt}
                      onChange={(event) =>
                        setOption({ ...option, prompt: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      size="small"
                      label="Code"
                      fullWidth
                      value={option.code}
                      onChange={(event) =>
                        setOption({ ...option, code: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      size="small"
                      label="Price"
                      fullWidth
                      value={option.price}
                      onChange={(event) =>
                        setOption({ ...option, price: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ mr: 1 }}>Default :</Typography>
                      <Box>
                        <Checkbox
                          color="success"
                          checked={option.default}
                          onChange={(event) => {
                            setOption({
                              ...option,
                              default: event.target.checked,
                              attrOptions: option.attrOptions.map((item) => ({
                                ...item,
                                defaults: false,
                              })),
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Box xs={{ ml: "auto", width: "fit-content" }}>
                      <Button
                        color="info"
                        size="small"
                        variant="contained"
                        onClick={onSubmit}
                        sx={{ mr: 2 }}
                      >
                        {option.mode === "add" ? "ADD" : "UPDATE"}
                      </Button>
                      <Button
                        color="secondary"
                        size="small"
                        variant="contained"
                        onClick={() =>
                          setOption({
                            ...option,
                            prompt: "",
                            code: "",
                            default: false,
                            price: "",
                            mode: "add",
                            attributeId: "",
                            open: false,
                          })
                        }
                      >
                        RESET
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ backgroundColor: "#e9ecef", m: 0 }}>
                  <TableRow>
                    <TableCell sx={{ padding: 1 }}>CODE</TableCell>
                    <TableCell sx={{ padding: 1 }}>PROMPT</TableCell>
                    <TableCell sx={{ padding: 1 }}>PRICE</TableCell>
                    <TableCell sx={{ padding: 1 }}>DEFAULT</TableCell>
                    <TableCell sx={{ padding: 1 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.attr_options !== undefined &&
                  row.attr_options !== null &&
                  row.attr_options.length
                    ? row.attr_options.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ padding: 1 }}>{item.code}</TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            {item.prompt}
                          </TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            {item.price}
                          </TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            <Checkbox
                              color="secondary"
                              checked={item.defaults}
                            />
                          </TableCell>
                          <TableCell sx={{ padding: 1 }}>
                            <IconButton
                              onClick={() =>
                                setOption({
                                  ...option,
                                  prompt: item.prompt,
                                  code: item.code,
                                  default: item.defaults,
                                  price: item.price,
                                  attributeId: row._id,
                                  open: true,
                                  mode: "edit",
                                  attrOptions: row.attr_options,
                                })
                              }
                            >
                              <EditIcon sx={{ color: "#03a5fc" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => handelDelete(index, row._id)}
                            >
                              <Delete color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    : "No data found"}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function LocalAttributeTable(props) {
  const { product, attribute, setProduct, setAttribute } = props;

  const disabled = React.useMemo(
    () => (product.localAttribute.length > 0 ? false : true),
    [product.localAttribute]
  );

  const login = useSelector((store) => store.loginReducer);

  async function updateProductAttribute(local_attribute) {
    fetch(UNIVERSAL.BASEURL + "admin/api/product/update_product_attributes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: login.user_token,
        product_id: product.productId,
        local_attribute: local_attribute,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  const onDragDropHandel = (result) => {
    if (!result.destination) {
      return;
    } else {
      let data = [...product.localAttribute];
      let attr = [...attribute.localAttribute];
      let attrRecord = attr.splice(result.source.index, 1);
      let record = data.splice(result.source.index, 1);
      data.splice(result.destination.index, 0, record[0]);
      product.productId !== "" &&
        attr.splice(result.destination.index, 0, attrRecord[0]);
      product.productId !== "" && updateProductAttribute(data);
      product.productId !== "" &&
        setAttribute({
          ...attribute,
          localAttribute: attr,
        });
      setProduct({
        ...product,
        localAttribute: data,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragDropHandel}>
      <TableContainer
        component={Paper}
        sx={{ height: { xs: 450, xl: "50vh" }, overFlow: "scroll" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e9ecef", m: 0 }}>
            <TableRow>
              <TableCell sx={{ padding: 0 }}>CODE</TableCell>
              <TableCell sx={{ padding: 0 }}>PROMPT</TableCell>
              <TableCell sx={{ padding: 0 }}>IMAGE</TableCell>
              <TableCell sx={{ padding: 0 }}>TYPE</TableCell>
              <TableCell sx={{ padding: 0 }}>REQUIRED</TableCell>
              <TableCell sx={{ padding: 0, width: 150 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Droppable} droppableId="Attribute">
            {(Provided) => (
              <TableBody ref={Provided.innerRef} {...Provided.droppableProps}>
                {!disabled && product.productId === ""
                  ? product.localAttribute.map((row, index) => (
                      <Draggable
                        key={row.prompt}
                        draggableId={row.prompt}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Row
                            index={index}
                            row={row}
                            key={index}
                            {...props}
                            innerRef={provided.innerRef}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))
                  : attribute.localAttribute.length > 0 &&
                    attribute.localAttribute.map((row, index) => (
                      <Draggable
                        key={row._id}
                        draggableId={row._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Row
                            index={index}
                            row={row}
                            key={index}
                            {...props}
                            innerRef={provided.innerRef}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}

                {Provided.placeholder}
              </TableBody>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </DragDropContext>
  );
}

export default LocalAttributeTable;
