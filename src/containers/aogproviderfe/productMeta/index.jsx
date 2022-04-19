import React, { Component } from "react";
import { connect } from "react-redux";
import ProductMetaComp from "components/aogproviderfe/productMeta";
import {
  setMetaTitle,
  setMetaDesc,
  setMetaKeyword,
  setForeginId,
  setEditMeta,
  resetMeta,
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
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllProduct: (token, searchKeyWord) => {
    dispatch(viewAllProduct(token, searchKeyWord));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  addProductMeta: (token, payload, universal) => {
    dispatch(addProductMeta(token, payload, universal));
  },
  updateProductMeta: (token, payload, universal) => {
    dispatch(updateProductMeta(token, payload, universal));
  },
  deleteProductMeta: (token, payload, universal) => {
    dispatch(deleteProductMeta(token, payload, universal));
  },
  viewProductMeta: (token, payload, universal) => {
    dispatch(viewProductMeta(token, payload, universal));
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
  setEditMeta: (payload) => {
    dispatch(setEditMeta(payload));
  },
  resetMeta: () => {
    dispatch(resetMeta());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductMetaCont);
