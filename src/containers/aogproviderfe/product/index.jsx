import React, { Component } from "react";
import { connect } from "react-redux";
import ProductComp from "components/aogproviderfe/product";
import {
  setProductName,
  setProductCode,
  setProductCost,
  setProductPrice,
  setProductWeight,
  setProductDescription,
  setProductTaxable,
  setProductCategoryId,
  setProductAssignUnassigned,
  setEditProduct,
  resetProduct,
  viewProduct,
  addProduct,
  updateProduct,
  assignProduct,
  unassignProduct,
  uploadCSV,
  exportCSV,
} from "actions/product";
import { viewAllCategory } from "actions/category";

class ProductCont extends Component {
  render() {
    return <ProductComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  product: store.productReducer,
  login: store.loginReducer,
  allCatgory: store.categoryReducer.allCatgory,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllCategory: (token, searchKeyWord) => {
    dispatch(viewAllCategory(token, searchKeyWord));
  },
  viewProduct: (token, universal) => {
    dispatch(viewProduct(token, universal));
  },
  addProduct: (token, payload, universal) => {
    dispatch(addProduct(token, payload, universal));
  },
  updateProduct: (token, payload, universal) => {
    dispatch(updateProduct(token, payload, universal));
  },
  assignProduct: (token, payload, universal) => {
    dispatch(assignProduct(token, payload, universal));
  },
  unassignProduct: (token, payload, universal) => {
    dispatch(unassignProduct(token, payload, universal));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  resetProduct: () => {
    dispatch(resetProduct());
  },
  setEditProduct: (payload) => {
    dispatch(setEditProduct(payload));
  },
  setProductAssignUnassigned: (payload) => {
    dispatch(setProductAssignUnassigned(payload));
  },
  setProductCategoryId: (payload) => {
    dispatch(setProductCategoryId(payload));
  },
  setProductTaxable: (payload) => {
    dispatch(setProductTaxable(payload));
  },
  setProductDescription: (payload) => {
    dispatch(setProductDescription(payload));
  },
  setProductWeight: (payload) => {
    dispatch(setProductWeight(payload));
  },
  setProductPrice: (payload) => {
    dispatch(setProductPrice(payload));
  },
  setProductCost: (payload) => {
    dispatch(setProductCost(payload));
  },
  setProductCode: (payload) => {
    dispatch(setProductCode(payload));
  },
  setProductName: (payload) => {
    dispatch(setProductName(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCont);
