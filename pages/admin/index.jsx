import React from "react";
import Title from "components/UI/Title";
import AdminDrawer from "components/UI/adminDrawer";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import withSSR from "@/wrapper";

class AdminPage extends React.Component {
  render() {
    return (
      <>
        <Title title={"admin"} />
        <Snackbar />
        <AdminDrawer Components={<>Hello To Backend World</>} />
        <Loader />
      </>
    );
  }
}

export default withSSR(AdminPage);