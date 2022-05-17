import * as React from "react";
import PropTypes from "prop-types";
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
import StatusMode from "components/UI/StatusMode";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Button from "components/UI/Button";
import OptionAdd from "components/aogproviderfe/attribute/attributeTable/optionAdd";
import Delete from "@mui/icons-material/Delete";

function Row(props) {
  const { row, setAttribute } = props;
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState({
    prompt: "",
    code: "",
    default: false,
    price: "",
    attributeId: "",
    mode: "",
    open: false,
    attrOptions: row.attr_options ? [...row.attr_options] : [],
  });

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

    props.addAttributeOption(
      props.login.user_token,
      props.universal,
      option,
      (status) => {
        setOption({
          ...option,
          prompt: "",
          code: "",
          default: false,
          price: "",
          attributeId: "",
          open: false,
          attrOptions: [...row.attr_options],
        });
      }
    );
  };

  const handelDelete = (index, _id) => {
    option.attrOptions.splice(index, 1);
    setOption({
      ...option,
      attrOptions: [...option.attrOptions],
      attributeId: _id,
    });
    props.addAttributeOption(
      props.login.user_token,
      props.universal,
      { attrOptions: option.attrOptions, attributeId: _id },
      (status) => {
        setOption({
          ...option,
          prompt: "",
          code: "",
          default: false,
          price: "",
          attributeId: "",
          open: false,
          attrOptions: [...row.attr_options],
        });
      }
    );
  };

  const check = React.useMemo(
    () =>
      props.universal.assignUnassignedStore.find((item) => item === row._id) ===
      row._id
        ? true
        : false,
    [props.universal.assignUnassignedStore]
  );

  const handelClick = () => {
    let data = [...props.universal.assignUnassignedStore];
    if (check === row._id) {
      data.splice(data.indexOf(check), 1);
      props.setAssignedUnassignedStore(data);
    } else {
      data.push(row._id);
      props.setAssignedUnassignedStore(data);
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ padding: 0 }}>
          <Checkbox checked={check} onClick={() => handelClick()} />
        </TableCell>
        <TableCell sx={{ padding: 0 }}>{row.code}</TableCell>
        <TableCell sx={{ padding: 0 }}>{row.prompt}</TableCell>
        <TableCell sx={{ padding: 0 }}>
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
        <TableCell sx={{ padding: 0 }}>{row.attr_type}</TableCell>
        <TableCell sx={{ padding: 0 }}>
          <Checkbox color="secondary" checked={row.required} />
        </TableCell>
        <TableCell sx={{ padding: 0 }}>
          <StatusMode active={row.status === 1 ? true : false} />
        </TableCell>
        <TableCell component="th" scope="row" sx={{ padding: 0, width: 150 }}>
          <IconButton
            size="small"
            onClick={() =>
              setAttribute({
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
              props.deleteAttribute(
                props.login.user_token,
                row._id,
                props.universal
              )
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 1, mx: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ my: 2 }}
                  gutterBottom
                  component="div"
                >
                  ATTRIBUTES OPTIONS
                </Typography>
                <Box sx={{ ml: "auto", width: "fit-content" }}>
                  <Button
                    color="info"
                    size="small"
                    variant="contained"
                    onClick={() =>
                      setOption({
                        ...option,
                        prompt: "",
                        code: "",
                        default: false,
                        price: "",
                        attributeId: row._id,
                        mode: "add",
                        open: true,
                        attrOptions: [...row.attr_options],
                      })
                    }
                  >
                    <AddIcon />
                  </Button>
                </Box>
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
      <OptionAdd
        option={option}
        setOption={setOption}
        title={
          option.mode === "add"
            ? "ADD ATTRIBUTE OPTION"
            : "EDIT ATTRIBUTE OPTION"
        }
        button={option.mode === "add" ? "ADD" : "UPDATE"}
        onSubmit={() => onSubmit()}
      />
    </>
  );
}

function AttributeTable(props) {
  const { universal, setAssignedUnassignedStore } = props;

  const handelClick = () => {
    if (universal.assignUnassignedStore.length) {
      setAssignedUnassignedStore([]);
    } else {
      let data = universal.store.map((item) => item._id);
      setAssignedUnassignedStore(data);
    }
  };

  const check = React.useMemo(
    () =>
      universal.assignUnassignedStore.map(
        (item, index) => item === universal.store[index]._id
      ).length
        ? true
        : false,
    [universal.assignUnassignedStore]
  );

  const disabled = React.useMemo(
    () => (universal.store.length > 0 ? false : true),
    [universal.store]
  );

  return (
    <TableContainer component={Paper} sx={{ height: 450, overFlow: "scroll" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#e9ecef", m: 0 }}>
          <TableRow>
            <TableCell sx={{ padding: 0 }}>
              <Checkbox
                checked={check}
                disabled={disabled}
                onClick={() => handelClick()}
              />
            </TableCell>
            <TableCell sx={{ padding: 0 }}>CODE</TableCell>
            <TableCell sx={{ padding: 0 }}>PROMPT</TableCell>
            <TableCell sx={{ padding: 0 }}>IMAGE</TableCell>
            <TableCell sx={{ padding: 0 }}>TYPE</TableCell>
            <TableCell sx={{ padding: 0 }}>REQUIRED</TableCell>
            <TableCell sx={{ padding: 0 }}>STATUS</TableCell>
            <TableCell sx={{ padding: 0, width: 150 }}>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!disabled &&
            universal.store.map((row, index) => (
              <Row key={index} index={index} row={row} {...props} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttributeTable;
