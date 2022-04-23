import React from "react";
import "@/styles/globals.css";
import App from "next/app";
import store from "@/store";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default store.withRedux(MyApp);
