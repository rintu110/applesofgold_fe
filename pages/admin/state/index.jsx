import React from "react";
import StateCont from "containers/aogproviderfe/state";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";


class CategoryMetaPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | State"} />
        <Snackbar />
        <AdminDrawer Components={<StateCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(CategoryMetaPage);