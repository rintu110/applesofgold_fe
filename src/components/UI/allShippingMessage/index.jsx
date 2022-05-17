import * as React from "react";
import TextField from "components/UI/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import UNIVERSAL from "@/config";

function AllShippingMessage({ value, onChange }) {
  const login = useSelector((store) => store.loginReducer);

  const [allShippingMessage, setAllShippingMessage] = React.useState([]);

  React.useEffect(() => {
    fetch(UNIVERSAL.BASEURL + "admin/api/product/view_all_shipping_message", {
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
          setAllShippingMessage(responseJson.result);
        } else {
          setAllShippingMessage([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setAllShippingMessage([]);
      });
  }, []);

  return (
    <TextField
      fullWidth
      color="secondary"
      label="Choose Shipping Message"
      onChange={(event) => onChange(event.target.value)}
      select
      value={value === "" ? "" : allShippingMessage.length > 0 ? value : ""}
    >
      <MenuItem value={""}></MenuItem>
      {allShippingMessage.map((item, index) => (
        <MenuItem value={item._id} key={index}>
          {item.code}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default AllShippingMessage;
