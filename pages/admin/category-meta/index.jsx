import React from "react";
import CategoryMetaCont from "containers/aogproviderfe/categoryMeta";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";


class CategoryMetaPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Category meta"} />
        <Snackbar />
        <AdminDrawer Components={<CategoryMetaCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(CategoryMetaPage);