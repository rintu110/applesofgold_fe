import React from "react";
import ShippingMessageCont from "containers/aogproviderfe/shippingMessage";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class ShippingMessagePage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Shipping Message"} />
        <Snackbar />
        <AdminDrawer Components={<ShippingMessageCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(ShippingMessagePage);
