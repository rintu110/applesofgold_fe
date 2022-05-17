import React, { Component } from "react";
import { connect } from "react-redux";
import AttributeComp from "components/aogproviderfe/attribute";
import {
  viewAttribute,
  addAttribute,
  updateAttribute,
  uploadCSV,
  exportCSV,
  assignAttribute,
  unassignAttribute,
  addAttributeOption,
  deleteAttribute,
} from "actions/attribute";
import { setAssignedUnassignedStore } from "actions/universal";

class AttributeCont extends Component {
  render() {
    return <AttributeComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAttribute: (token, attributeId, universal) => {
    dispatch(deleteAttribute(token, attributeId, universal));
  },
  setAssignedUnassignedStore: (payload) => {
    dispatch(setAssignedUnassignedStore(payload));
  },
  assignAttribute: (token, universal) => {
    dispatch(assignAttribute(token, universal));
  },
  unassignAttribute: (token, universal) => {
    dispatch(unassignAttribute(token, universal));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  updateAttribute: (token, payload, universal, callBack) => {
    dispatch(updateAttribute(token, payload, universal, callBack));
  },
  addAttribute: (token, payload, universal, callBack) => {
    dispatch(addAttribute(token, payload, universal, callBack));
  },
  viewAttribute: (token, universal) => {
    dispatch(viewAttribute(token, universal));
  },
  addAttributeOption: (token, universal, payload, callBack) => {
    dispatch(addAttributeOption(token, universal, payload, callBack));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributeCont);
