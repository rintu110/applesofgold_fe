import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import AppBar from "../UI/AppBar";

function Router(props) {
  return (
    <>
      <BrowserRouter>
        <AppBar />
      </BrowserRouter>
    </>
  );
}

export default Router;
