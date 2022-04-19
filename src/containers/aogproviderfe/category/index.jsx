import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryComp from "components/aogproviderfe/category";
import {
  setCategoryName,
  setCategoryCode,
  setCategoryContent,
  setCategoryParentId,
  setAssignUnassignCategory,
  resetCategory,
  setEditCategory,
  viewCategory,
  addCategory,
  updateCategory,
  assignedCategory,
  unassignedCategory,
  viewAllCategory,
  uploadCSV,
  exportCSV,
} from "actions/category";

class CategoryCont extends Component {
  render() {
    return <CategoryComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  category: store.categoryReducer,
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  viewAllCategory: (token, searchKeyWord) => {
    dispatch(viewAllCategory(token, searchKeyWord));
  },
  setCategoryName: (payload) => {
    dispatch(setCategoryName(payload));
  },
  setCategoryCode: (payload) => {
    dispatch(setCategoryCode(payload));
  },
  setCategoryContent: (payload) => {
    dispatch(setCategoryContent(payload));
  },
  setCategoryParentId: (payload) => {
    dispatch(setCategoryParentId(payload));
  },
  setAssignUnassignCategory: (payload) => {
    dispatch(setAssignUnassignCategory(payload));
  },
  setEditCategory: (payload) => {
    dispatch(setEditCategory(payload));
  },
  resetCategory: () => {
    dispatch(resetCategory());
  },
  viewCategory: (token, universal) => {
    dispatch(viewCategory(token, universal));
  },
  addCategory: (token, payload, universal) => {
    dispatch(addCategory(token, payload, universal));
  },
  updateCategory: (token, payload, universal) => {
    dispatch(updateCategory(token, payload, universal));
  },
  assignedCategory: (token, payload, universal) => {
    dispatch(assignedCategory(token, payload, universal));
  },
  unassignedCategory: (token, payload, universal) => {
    dispatch(unassignedCategory(token, payload, universal));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCont);
