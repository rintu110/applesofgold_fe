import * as React from "react";
import TextField from "components/UI/TextField";
import Box from "@mui/material/Box";
import Button from "components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchKeyword } from "actions/universal";

function Search({ searchBy, CallBack }) {
  const universal = useSelector((store) => store.universalReducer);

  const dispatch = useDispatch();

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        size="small"
        fullWidth
        color="primary"
        placeholder={`Search by ${searchBy}`}
        value={universal.searchKeyword}
        onChange={(event) => dispatch(setSearchKeyword(event.target.value))}
        InputProps={{
          endAdornment: (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => CallBack()}
            >
              Search
            </Button>
          ),
        }}
      />
    </Box>
  );
}

export default Search;
