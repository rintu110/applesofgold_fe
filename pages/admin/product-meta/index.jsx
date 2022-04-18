import React from "react";
import ProductMetaCont from "containers/aogproviderfe/productMeta";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class ProductMetaPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Product meta"} />
        <Snackbar />
        <AdminDrawer Components={<ProductMetaCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(ProductMetaPage);
