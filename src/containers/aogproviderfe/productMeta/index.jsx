import React, { Component } from "react";
import { connect } from "react-redux";
import ProductMetaComp from "components/aogproviderfe/productMeta";
import {
  setMetaTitle,
  setMetaDesc,
  setMetaKeyword,
  setForeginId,
  setMetaSearchKeyword,
  setEditMeta,
  resetMeta,
  setMetaStartingAfter,
  setMetaLimit,
  resetEverythingMeta,
} from "actions/meta";
import {
  viewProductMeta,
  addProductMeta,
  updateProductMeta,
  deleteProductMeta,
  uploadCSV,
  exportCSV,
} from "actions/productMeta";
import { viewAllProduct } from "actions/product";

class ProductMetaCont extends Component {
  render() {
    return <ProductMetaComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  meta: store.metaReducer,
  login: store.loginReducer,
  allProduct: store.productReducer.allProduct,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllProduct: (token, searchKeyWord) => {
    dispatch(viewAllProduct(token, searchKeyWord));
  },
  setMetaStartingAfter: (token, payload, startingAfter, callBack) => {
    dispatch(setMetaStartingAfter(token, payload, startingAfter, callBack));
  },
  setMetaLimit: (token, payload, limit, callBack) => {
    dispatch(setMetaLimit(token, payload, limit, callBack));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, payload) => {
    dispatch(uploadCSV(token, csv, payload));
  },
  addProductMeta: (token, payload) => {
    dispatch(addProductMeta(token, payload));
  },
  updateProductMeta: (token, payload) => {
    dispatch(updateProductMeta(token, payload));
  },
  deleteProductMeta: (token, payload) => {
    dispatch(deleteProductMeta(token, payload));
  },
  viewProductMeta: (token, payload) => {
    dispatch(viewProductMeta(token, payload));
  },
  setMetaTitle: (payload) => {
    dispatch(setMetaTitle(payload));
  },
  setMetaDesc: (payload) => {
    dispatch(setMetaDesc(payload));
  },
  setMetaKeyword: (payload) => {
    dispatch(setMetaKeyword(payload));
  },
  setForeginId: (payload) => {
    dispatch(setForeginId(payload));
  },
  setMetaSearchKeyword: (payload) => {
    dispatch(setMetaSearchKeyword(payload));
  },
  setEditMeta: (payload) => {
    dispatch(setEditMeta(payload));
  },
  resetMeta: () => {
    dispatch(resetMeta());
  },
  resetEverythingMeta: () => {
    dispatch(resetEverythingMeta());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductMetaCont);
