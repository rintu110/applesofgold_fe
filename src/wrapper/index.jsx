import React from "react";
import store from "@/store";
import { getServerSideUserDetails } from "actions/login";
import cookies from "next-cookies";

const withSSR = (Com) => {
  class ServersideWrapping extends React.Component {
    static getInitialProps = store.getInitialPageProps(
      (store) => async (context) => {

        const token = cookies(context).applesofgoldObject;
        const type = cookies(context).type;

        var status = store.getState().loginReducer.status;

        if (!status && token !== "" && (type === "A" || type === "SA" || type === "U")) {
          if (!store.getState().loginReducer.user_token) {
            await getServerSideUserDetails(token, store);
          }
        } else if (token === "" || type === "") {
          context.res.writeHead(308, {
            Location: "/"
          })
        }

        const props = Com.getInitialProps && (await Com.getInitialProps(context));

        return { props };
      }
    );

    render() {
      const { ...props } = this.props;
      return <Com {...props} />;
    }
  }
  return ServersideWrapping;
};
export default withSSR;
