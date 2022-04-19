import React, { Component } from "react";
import { connect } from "react-redux";
import AssignCategoryProductComp from "components/aogproviderfe/assignCatPrd";
import { viewAllCategory } from "actions/category";
import { viewAllProduct } from "actions/product";
import {
  setAssignCatId,
  setAssignPrdId,
  setAssignedUnassignedCatPrd,
  setEditAssignCatPrd,
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
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewAssignCatPrd: (token, universal) => {
    dispatch(viewAssignCatPrd(token, universal));
  },
  addAssignCatPrd: (token, payload, universal) => {
    dispatch(addAssignCatPrd(token, payload, universal));
  },
  updateAssignCatPrd: (token, payload, universal) => {
    dispatch(updateAssignCatPrd(token, payload, universal));
  },
  assignedCatPrd: (token, payload, universal) => {
    dispatch(assignedCatPrd(token, payload, universal));
  },
  unassignedCatPrd: (token, payload, universal) => {
    dispatch(unassignedCatPrd(token, payload, universal));
  },
  setAssignCatId: (payload) => {
    dispatch(setAssignCatId(payload));
  },
  setAssignPrdId: (payload) => {
    dispatch(setAssignPrdId(payload));
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
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
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
