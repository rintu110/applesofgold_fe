import React, { Component } from "react";
import { connect } from "react-redux";
import AssignCategoryProductComp from "components/aogproviderfe/assignCatPrd";
import { viewAllCategory } from "actions/category";
import { viewAllProduct } from "actions/product";
import {
  setAssignCatId,
  setAssignPrdId,
  setAssignCatPrdSearchKeyword,
  setAssignedUnassignedCatPrd,
  setEditAssignCatPrd,
  setAssignStartingAfter,
  setAssignLimit,
  resetCatPrd,
  viewAssignCatPrd,
  addAssignCatPrd,
  updateAssignCatPrd,
  assignedCatPrd,
  unassignedCatPrd,
  uploadCSV,
  exportCSV,
} from "actions/assignCatPrd";

class AssignCategoryProductCont extends Component {
  render() {
    return <AssignCategoryProductComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  login: store.loginReducer,
  assign: store.assignCatPrdReducer,
  allProduct: store.productReducer.allProduct,
  allCatgory: store.categoryReducer.allCatgory,
});

const mapDispatchToProps = (dispatch) => ({
  viewAssignCatPrd: (token, payload) => {
    dispatch(viewAssignCatPrd(token, payload));
  },
  addAssignCatPrd: (token, payload) => {
    dispatch(addAssignCatPrd(token, payload));
  },
  updateAssignCatPrd: (token, payload) => {
    dispatch(updateAssignCatPrd(token, payload));
  },
  assignedCatPrd: (token, payload) => {
    dispatch(assignedCatPrd(token, payload));
  },
  unassignedCatPrd: (token, payload) => {
    dispatch(unassignedCatPrd(token, payload));
  },
  setAssignStartingAfter: (token, payload, startingAfter) => {
    dispatch(setAssignStartingAfter(token, payload, startingAfter));
  },
  setAssignLimit: (token, payload, limit) => {
    dispatch(setAssignLimit(token, payload, limit));
  },
  setAssignCatId: (payload) => {
    dispatch(setAssignCatId(payload));
  },
  setAssignPrdId: (payload) => {
    dispatch(setAssignPrdId(payload));
  },
  setAssignCatPrdSearchKeyword: (payload) => {
    dispatch(setAssignCatPrdSearchKeyword(payload));
  },
  setAssignedUnassignedCatPrd: (payload) => {
    dispatch(setAssignedUnassignedCatPrd(payload));
  },
  resetCatPrd: () => {
    dispatch(resetCatPrd());
  },
  setEditAssignCatPrd: (payload) => {
    dispatch(setEditAssignCatPrd(payload));
  },

  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, payload) => {
    dispatch(uploadCSV(token, csv, payload));
  },
  viewAllCategory: (token, searchKeyWord) => {
    dispatch(viewAllCategory(token, searchKeyWord));
  },
  viewAllProduct: (token, searchKeyWord) => {
    dispatch(viewAllProduct(token, searchKeyWord));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignCategoryProductCont);
