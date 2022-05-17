import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryComp from "components/aogproviderfe/category";
import {
  viewCategory,
  addCategory,
  updateCategory,
  assignedCategory,
  unassignedCategory,
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
  viewCategory: (token, universal) => {
    dispatch(viewCategory(token, universal));
  },
  addCategory: (token, payload, universal, callBack) => {
    dispatch(addCategory(token, payload, universal, callBack));
  },
  updateCategory: (token, payload, universal, callBack) => {
    dispatch(updateCategory(token, payload, universal, callBack));
  },
  assignedCategory: (token, universal) => {
    dispatch(assignedCategory(token, universal));
  },
  unassignedCategory: (token, universal) => {
    dispatch(unassignedCategory(token, universal));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCont);
