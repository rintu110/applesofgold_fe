import React from "react";
import CategoryMetaCont from "containers/aogproviderfe/country";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";


class CategoryMetaPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Country"} />
        <Snackbar />
        <AdminDrawer Components={<CategoryMetaCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(CategoryMetaPage);