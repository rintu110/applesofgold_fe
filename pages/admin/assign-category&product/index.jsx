import React from "react";
import AssignCategoryProductCont from "containers/aogproviderfe/assignCatPrd";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class AssignCategoryProductPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin | Assign Category & Product"} />
        <Snackbar />
        <AdminDrawer Components={<AssignCategoryProductCont />} />
        <Loader />
      </>
    );
  }
}

export default withSSR(AssignCategoryProductPage);
