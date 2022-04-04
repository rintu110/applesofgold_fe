import React from "react";
import { Navigate } from "react-router-dom";

const Authrized = (Components) => {
  class Auth extends React.Component {
    render() {
      if (
        (localStorage.getItem("token") === null ||
          localStorage.getItem("token") === undefined ||
          localStorage.getItem("token") === "") &&
        (localStorage.getItem("type") === null ||
          localStorage.getItem("type") === undefined ||
          localStorage.getItem("type") === "")
      ) {
        return <Navigate to="/" replace={true} />;
      }
      return <Components />;
    }
  }
  return Auth;
};

export default Authrized;
