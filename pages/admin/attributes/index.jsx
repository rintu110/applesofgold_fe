import React from "react";
import AttributeCont from "containers/aogproviderfe/attribute";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class AttributePage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Attributes"} />
        <Snackbar />
        <AdminDrawer Components={<AttributeCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(AttributePage);
