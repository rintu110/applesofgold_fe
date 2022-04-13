import React from "react";
import AdminLogin from "components/aogproviderfe/login";
import Snackbar from "components/UI/SnackBar";
import Loader from "components/UI/Loader";
import store from "@/store";
import withSSR from "@/wrapper";
import cookies from "next-cookies";

function Home() {
  return (<>
    <Snackbar />
    <AdminLogin />
    <Loader />
  </>);
}

Home.getInitialProps = store.getInitialPageProps((store) => async (ctx) => {
  const token = cookies(ctx).applesofgoldObject;
  const type = cookies(ctx).type;

  if (token !== "" && (type === "A" || type === "SA")) {
    ctx.res.writeHead(301, {
      Location: "/admin"
    });
    ctx.res.end();
  } else if (token !== "" && type === "U") {
    ctx.res.writeHead(301, {
      Location: "/user"
    });
    ctx.res.end();
  }
});

export default withSSR(Home);
