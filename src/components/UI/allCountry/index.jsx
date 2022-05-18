import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "components/UI/TextField";
import { useSelector } from "react-redux";
import UNIVERSAL from "@/config";

function AllCountry({ value, onChange }) {
  const login = useSelector((store) => store.loginReducer);

  const [allCountry, setAllCountry] = React.useState([]);

  React.useEffect(() => {
    fetch(UNIVERSAL.BASEURL + "admin/api/country/view_all_country", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_token: login.user_token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          setAllCountry(responseJson.result);
        } else {
          setAllCountry([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAllCountry([]);
      });
  }, []);

  return (
    <TextField
      fullWidth
      color="secondary"
      label="Choose Country"
      onChange={(event) => onChange(event.target.value)}
      select
      value={value === null ? "" : allCountry.length > 0 ? value : ""}
    >
      <MenuItem value={""}></MenuItem>
      {allCountry.map((item, index) => (
        <MenuItem value={item._id} key={index}>
          {item.country_nm}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AllCountry;
