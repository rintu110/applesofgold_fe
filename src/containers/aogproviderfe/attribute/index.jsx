import React, { Component } from "react";
import { connect } from "react-redux";
import AttributeComp from "components/aogproviderfe/attribute";
import {
  setAttributePrompt,
  setAttributeCode,
  setAttributeEdit,
  resetAttribute,
  viewAttribute,
  addAttribute,
  updateAttribute,
  uploadCSV,
  exportCSV,
  setAttributeLabel,
  setAttributeImage,
  setAttributeType,
} from "actions/attribute";

class AttributeCont extends Component {
  render() {
    return <AttributeComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  attribute: store.attributeReducer,
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setAttributeLabel: (payload) => {
    dispatch(setAttributeLabel(payload));
  },
  setAttributeImage: (payload) => {
    dispatch(setAttributeImage(payload));
  },
  setAttributeType: (payload) => {
    dispatch(setAttributeType(payload));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  updateAttribute: (token, payload, universal) => {
    dispatch(updateAttribute(token, payload, universal));
  },
  addAttribute: (token, payload, universal) => {
    dispatch(addAttribute(token, payload, universal));
  },
  viewAttribute: (token, universal) => {
    dispatch(viewAttribute(token, universal));
  },
  setAttributePrompt: (payload) => {
    dispatch(setAttributePrompt(payload));
  },
  setAttributeCode: (payload) => {
    dispatch(setAttributeCode(payload));
  },
  setAttributeEdit: (payload) => {
    dispatch(setAttributeEdit(payload));
  },
  resetAttribute: () => {
    dispatch(resetAttribute());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributeCont);
