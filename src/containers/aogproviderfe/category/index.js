import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryComp from "../../../components/aogproviderfe/category";
import {
  setCategoryName,
  setCategoryCode,
  setCategoryContent,
  setCategoryParentId,
  setCategoryKeyWord,
  setAssignUnassignCategory,
  resetCategory,
  setEditCategory,
  viewCategory,
  addCategory,
  updateCategory,
  assignedCategory,
  unassignedCategory,
  setCategoryLimit,
  setCategoryStartingAfter,
  viewAllCategory,
} from "../../../actions/category";
import Authrized from "../../../wrapper";

class CategoryCont extends Component {
  render() {
    return <CategoryComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  category: store.categoryReducer,
  login: store.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllCategory: (token) => {
    dispatch(viewAllCategory(token));
  },
  setCategoryLimit: (token, payload, limit) => {
    dispatch(setCategoryLimit(token, payload, limit));
  },
  setCategoryStartingAfter: (token, payload, startingAfter) => {
    dispatch(setCategoryStartingAfter(token, payload, startingAfter));
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
  setCategoryKeyWord: (payload) => {
    dispatch(setCategoryKeyWord(payload));
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
  viewCategory: (token, payload) => {
    dispatch(viewCategory(token, payload));
  },
  addCategory: (token, payload) => {
    dispatch(addCategory(token, payload));
  },
  updateCategory: (token, payload) => {
    dispatch(updateCategory(token, payload));
  },
  assignedCategory: (token, payload) => {
    dispatch(assignedCategory(token, payload));
  },
  unassignedCategory: (token, payload) => {
    dispatch(unassignedCategory(token, payload));
  },
});

export default Authrized(
  connect(mapStateToProps, mapDispatchToProps)(CategoryCont)
);
