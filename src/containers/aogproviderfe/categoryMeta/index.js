import React, { Component } from "react";
import { connect } from "react-redux";
import Authrized from "../../../wrapper";
import CategoryMetaComp from "../../../components/aogproviderfe/category_meta";
import {
  setMetaTitle,
  setMetaDesc,
  setMetaKeyword,
  setCategoryId,
  setMetaSearchKeyword,
  setEditMeta,
  resetMeta,
  viewMeta,
  addMeta,
  updateMeta,
  deleteMeta,
} from "../../../actions/categoryMeta";
import { viewAllCategory } from "../../../actions/category";

class CategoryMetaCont extends Component {
  render() {
    return <CategoryMetaComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  meta: store.categoryMetaReducer,
  login: store.loginReducer,
  allCatgory: store.categoryReducer.allCatgory,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllCategory: (token) => {
    dispatch(viewAllCategory(token));
  },
  addMeta: (token, payload) => {
    dispatch(addMeta(token, payload));
  },
  updateMeta: (token, payload) => {
    dispatch(updateMeta(token, payload));
  },
  deleteMeta: (token, payload) => {
    dispatch(deleteMeta(token, payload));
  },
  viewMeta: (token, payload) => {
    dispatch(viewMeta(token, payload));
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
  setCategoryId: (payload) => {
    dispatch(setCategoryId(payload));
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
});

export default Authrized(
  connect(mapStateToProps, mapDispatchToProps)(CategoryMetaCont)
);
