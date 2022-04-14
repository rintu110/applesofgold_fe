import React from "react";
import ProductCont from "containers/aogproviderfe/product";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class ProductPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Product"} />
        <Snackbar />
        <AdminDrawer Components={<ProductCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(ProductPage);
