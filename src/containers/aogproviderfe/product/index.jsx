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
  setProductKeyword,
  viewProduct,
  addProduct,
  updateProduct,
  assignProduct,
  unassignProduct,
  uploadCSV,
  exportCSV,
  setProductStartingAfter,
  setProductLimit,
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
});

const mapDispatchToProps = (dispatch) => ({
  setProductLimit: (token, payload, limit) => {
    dispatch(setProductLimit(token, payload, limit));
  },
  setProductStartingAfter: (token, payload, startingAfter) => {
    dispatch(setProductStartingAfter(token, payload, startingAfter));
  },
  viewAllCategory: (token, searchKeyWord) => {
    dispatch(viewAllCategory(token, searchKeyWord));
  },
  viewProduct: (token, payload) => {
    dispatch(viewProduct(token, payload));
  },
  addProduct: (token, payload) => {
    dispatch(addProduct(token, payload));
  },
  updateProduct: (token, payload) => {
    dispatch(updateProduct(token, payload));
  },
  assignProduct: (token, payload) => {
    dispatch(assignProduct(token, payload));
  },
  unassignProduct: (token, payload) => {
    dispatch(unassignProduct(token, payload));
  },
  uploadCSV: (token, csv, payload) => {
    dispatch(uploadCSV(token, csv, payload));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  resetProduct: () => {
    dispatch(resetProduct());
  },
  setProductKeyword: (payload) => {
    dispatch(setProductKeyword(payload));
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
