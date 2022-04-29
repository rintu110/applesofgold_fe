import * as React from "react";
import Box from "@mui/material/Box";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "components/UI/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setStartingAfter, setLimit } from "actions/universal";

function Pagination() {
  const universal = useSelector((store) => store.universalReducer);

  const dispatch = useDispatch();
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
        displaying {parseInt(universal.startingAfter) + 1} -{" "}
        {parseInt(universal.limit) + parseInt(universal.startingAfter) >
        parseInt(universal.total)
          ? universal.total
          : parseInt(universal.limit) + parseInt(universal.startingAfter)}{" "}
        of {universal.total}
        <IconButton
          disabled={universal.startingAfter === 0}
          onClick={() =>
            dispatch(
              setStartingAfter(
                parseInt(universal.startingAfter) - parseInt(universal.limit)
              )
            )
          }
        >
          <SkipPreviousIcon />
        </IconButton>
        <IconButton
          disabled={
            universal.startingAfter + universal.limit >= universal.total
          }
          onClick={() =>
            dispatch(
              setStartingAfter(
                parseInt(universal.startingAfter) + parseInt(universal.limit)
              )
            )
          }
        >
          <SkipNextIcon />
        </IconButton>
      </span>
      <Box sx={{ bgcolor: "#ffffff", ml: 2 }}>
        <TextField
          value={universal.limit}
          select
          onChange={(event) => dispatch(setLimit(event.target.value))}
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
