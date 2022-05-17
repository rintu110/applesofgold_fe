import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import TextField from "components/UI/TextField";
import UNIVERSAL from "@/config";

function AllProduct({ onChange, value, size }) {
  const login = useSelector((store) => store.loginReducer);

  const [search, setSearch] = React.useState("");
  const [allProduct, setAllProduct] = React.useState([]);

  React.useEffect(() => {
    fetch(UNIVERSAL.BASEURL + "admin/api/product/view_all_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: login.user_token,
        searchKeyWord: search,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setAllProduct(responseJson.result);
        } else {
          setAllProduct([]);
        }
      })
      .catch((e) => {
        console.error(e);
        setAllProduct([]);
      });
  }, [search]);

  return (
    <Autocomplete
      value={value}
      options={allProduct}
      freeSolo
      autoComplete
      isOptionEqualToValue={(option, value) => true}
      onInputChange={(event, value) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        setSearch(value)
      }
      onChange={(event, value) => onChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size ? size : "small"}
          fullWidth
          color="secondary"
          placeholder="Choose Product"
        />
      )}
      disableListWrap
      getOptionLabel={(option) => (option.sku ? option.sku : "")}
      renderOption={(props, option) => (
        <li {...props} key={option._id}>
          {option.sku}
        </li>
      )}
    />
  );
}

export default AllProduct;
