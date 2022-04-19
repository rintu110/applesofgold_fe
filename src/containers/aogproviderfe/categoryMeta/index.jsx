import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryMetaComp from "components/aogproviderfe/categoryMeta";
import {
  viewMeta,
  addMeta,
  updateMeta,
  uploadCSV,
  exportCSV,
} from "actions/categoryMeta";
import {
  setMetaTitle,
  setMetaDesc,
  setMetaKeyword,
  setForeginId,
  setEditMeta,
  resetMeta,
  setMetaContent,
} from "actions/meta";
import { viewAllCategory } from "actions/category";

class CategoryMetaCont extends Component {
  render() {
    return <CategoryMetaComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  meta: store.metaReducer,
  login: store.loginReducer,
  allCatgory: store.categoryReducer.allCatgory,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setMetaContent: (payload) => {
    dispatch(setMetaContent(payload));
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
  addMeta: (token, payload, universal) => {
    dispatch(addMeta(token, payload, universal));
  },
  updateMeta: (token, payload, universal) => {
    dispatch(updateMeta(token, payload, universal));
  },
  viewMeta: (token, universal) => {
    dispatch(viewMeta(token, universal));
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMetaCont);
