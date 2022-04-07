import * as React from "react";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "../TextField";

function Pagination(props) {
  return (
    <Box
      sx={{
        ml: "auto",
        width: "fit-content",
        my: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ backgroundColor: "#FFFFFF" }}>
        displaying {parseInt(props.startingAfter) + 1} -{" "}
        {parseInt(props.limit) + parseInt(props.startingAfter) >
        parseInt(props.total)
          ? props.total
          : parseInt(props.limit) + parseInt(props.startingAfter)}{" "}
        of {props.total}
        <IconButton
          disabled={props.startingAfter === 0}
          onClick={() => props.previousPage()}
        >
          <Icon>navigate_before</Icon>
        </IconButton>
        <IconButton
          disabled={props.startingAfter + props.limit >= props.total}
          onClick={() => props.nextPage()}
        >
          <Icon>navigate_next</Icon>
        </IconButton>
      </span>
      <Box sx={{ bgcolor: "#ffffff", ml: 2 }}>
        <TextField
          value={props.limit}
          select
          onChange={(event) => props.setLimit(event.target.value)}
          color="secondary"
          size="small"
        >
          {[5, 10, 15, 20].map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}

export default Pagination;
