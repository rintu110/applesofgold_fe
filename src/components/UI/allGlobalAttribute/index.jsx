import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "components/UI/TextField";
import { useSelector } from "react-redux";
import UNIVERSAL from "@/config";

function AllGlobalAttribute({ value, onChange }) {
  const login = useSelector((store) => store.loginReducer);

  const [allGlobalAttribute, setAllGlobalAttributes] = React.useState([]);

  React.useEffect(() => {
    fetch(UNIVERSAL.BASEURL + "admin/api/attributes/view_all_attributes", {
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
          setAllGlobalAttributes(responseJson.result);
        } else {
          setAllGlobalAttributes([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAllGlobalAttributes([]);
      });
  }, []);

  return (
    <TextField
      fullWidth
      color="secondary"
      label="Choose Global Attribute"
      onChange={(event) => onChange(event.target.value)}
      select
      value={value === "" ? "" : allGlobalAttribute.length > 0 ? value : ""}
    >
      <MenuItem value={""}></MenuItem>
      {allGlobalAttribute.map((item, index) => (
        <MenuItem value={item._id} key={index}>
          {item.prompt}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AllGlobalAttribute;
