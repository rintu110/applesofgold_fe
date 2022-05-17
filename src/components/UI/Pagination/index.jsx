import * as React from "react";
import Box from "@mui/material/Box";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "components/UI/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setStartingAfter, setLimit } from "actions/universal";
import Pagination from "@mui/material/Pagination";

function PaginationComp() {
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
      <Pagination
        count={
          Number.isInteger(
            parseInt(universal.total) / parseInt(universal.limit)
          )
            ? parseInt(universal.total / universal.limit)
            : parseInt(universal.total / universal.limit) + 1
        }
        hideNextButton={false}
        hidePrevButton={false}
        showFirstButton={false}
        showLastButton={false}
        page={parseInt(universal.startingAfter / universal.limit) + 1}
        shape="circular"
        siblingCount={1}
        variant="outlined"
        color="secondary"
        onChange={(event, page) =>
          dispatch(setStartingAfter(parseInt(universal.limit) * (page - 1)))
        }
      />
      <Box sx={{ bgcolor: "#ffffff", ml: 2 }}>
        <TextField
          value={universal.limit}
          select
          onChange={(event) => dispatch(setLimit(event.target.value))}
          color="secondary"
          size="small"
        >
          {[10, 30, 50, 100].map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}

export default PaginationComp;
