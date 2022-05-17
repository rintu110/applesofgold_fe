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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Delete from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import UNIVERSAL from "@/config";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Row(props) {
  const {
    row,
    product,
    setProduct,
    index,
    deleteGlobalAttribute,
    innerRef,
    provided,
    snapshot,
  } = props;
  const [open, setOpen] = React.useState(false);

  const attributeHandelDelete = (index) => {
    let data = [...product.globalAttribute];
    data.splice(index, 1);
    setProduct({
      ...product,
      globalAttribute: data,
    });
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
            onClick={() =>
              product.productId === ""
                ? attributeHandelDelete(index)
                : deleteGlobalAttribute(row._id)
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
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ backgroundColor: "#e9ecef", m: 0 }}>
                  <TableRow>
                    <TableCell sx={{ padding: 1 }}>CODE</TableCell>
                    <TableCell sx={{ padding: 1 }}>PROMPT</TableCell>
                    <TableCell sx={{ padding: 1 }}>PRICE</TableCell>
                    <TableCell sx={{ padding: 1 }}>DEFAULT</TableCell>
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

function GlobalAttributeTable(props) {
  const { product, attribute, setProduct, setAttribute } = props;

  const disabled = React.useMemo(
    () => (product.globalAttribute.length > 0 ? false : true),
    [product.globalAttribute]
  );

  const check = React.useMemo(
    () => (attribute.globalAttributeIds.length > 0 ? false : true),
    [attribute.globalAttributeIds]
  );

  const login = useSelector((store) => store.loginReducer);

  async function updateProductGlobalAttribute(global_attribute) {
    fetch(
      UNIVERSAL.BASEURL + "admin/api/product/update_product_global_attributes",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_token: login.user_token,
          product_id: product.productId,
          global_attribute_ids: global_attribute,
        }),
      }
    ).catch((error) => {
      console.error(error);
    });
  }

  const onDragDropHandel = (result) => {
    if (!result.destination) {
      return;
    } else {
      let data = [...product.globalAttribute];
      let attr = [...attribute.globalAttributeIds];
      let attrRecord = attr.splice(result.source.index, 1);
      let record = data.splice(result.source.index, 1);
      data.splice(result.destination.index, 0, record[0]);
      attr.splice(result.destination.index, 0, attrRecord[0]);
      product.productId !== "" && updateProductGlobalAttribute(data);
      setAttribute({
        ...attribute,
        globalAttributeIds: attr,
      });
      setProduct({
        ...product,
        globalAttribute: data,
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
                {!disabled &&
                  !check &&
                  attribute.globalAttributeIds.map((row, index) => (
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

export default GlobalAttributeTable;
