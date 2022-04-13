import React from "react";
import CategoryCont from "containers/aogproviderfe/category";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";


class CategoryPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Category"} />
        <Snackbar />
        <AdminDrawer Components={<CategoryCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(CategoryPage);
