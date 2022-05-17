import React, { Component } from "react";
import { connect } from "react-redux";
import ProductComp from "components/aogproviderfe/product";
import {
  viewProduct,
  addProduct,
  updateProduct,
  assignProduct,
  unassignProduct,
  deleteProduct,
  uploadCSV,
  exportCSV,
} from "actions/product";

class ProductCont extends Component {
  render() {
    return <ProductComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (token, payload, universal) => {
    dispatch(deleteProduct(token, payload, universal));
  },
  viewProduct: (token, universal) => {
    dispatch(viewProduct(token, universal));
  },
  addProduct: (token, payload, universal, callBack) => {
    dispatch(addProduct(token, payload, universal, callBack));
  },
  updateProduct: (token, payload, universal, callBack) => {
    dispatch(updateProduct(token, payload, universal, callBack));
  },
  assignProduct: (token, universal) => {
    dispatch(assignProduct(token, universal));
  },
  unassignProduct: (token, universal) => {
    dispatch(unassignProduct(token, universal));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCont);
