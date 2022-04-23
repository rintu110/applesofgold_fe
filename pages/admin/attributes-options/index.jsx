import React from "react";
import AttributeOptionCont from "containers/aogproviderfe/attributeOption";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class AttributeOptionPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Attributes Option"} />
        <Snackbar />
        <AdminDrawer Components={<AttributeOptionCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(AttributeOptionPage);
