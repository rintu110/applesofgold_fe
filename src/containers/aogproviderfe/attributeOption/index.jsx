import React, { Component } from "react";
import { connect } from "react-redux";
import AttributeOptionComp from "components/aogproviderfe/attributeOption";
import {
  setAttributePrompt,
  setAttributeCode,
  resetAttribute,
  setAttributeImage,
  setOptionPrice,
  setOptionCost,
  setAttributeId,
  setEditAttributeOption,
  viewAllAttribute,
} from "actions/attribute";
import {
  viewAttributeOption,
  addAttributeOption,
  updateAttributeOption,
  uploadCSV,
  exportCSV,
} from "actions/attributeOption";

class AttributeOptionCont extends Component {
  render() {
    return <AttributeOptionComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  attribute: store.attributeReducer,
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  viewAllAttribute: (token, event) => {
    dispatch(viewAllAttribute(token, event));
  },
  setAttributePrompt: (payload) => {
    dispatch(setAttributePrompt(payload));
  },
  setAttributeCode: (payload) => {
    dispatch(setAttributeCode(payload));
  },
  setEditAttributeOption: (payload) => {
    dispatch(setEditAttributeOption(payload));
  },
  resetAttribute: () => {
    dispatch(resetAttribute());
  },
  setOptionPrice: (payload) => {
    dispatch(setOptionPrice(payload));
  },
  setOptionCost: (payload) => {
    dispatch(setOptionCost(payload));
  },
  setAttributeImage: (payload) => {
    dispatch(setAttributeImage(payload));
  },
  setAttributeId: (payload) => {
    dispatch(setAttributeId(payload));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  updateAttributeOption: (token, payload, universal) => {
    dispatch(updateAttributeOption(token, payload, universal));
  },
  addAttributeOption: (token, payload, universal) => {
    dispatch(addAttributeOption(token, payload, universal));
  },
  viewAttributeOption: (token, universal) => {
    dispatch(viewAttributeOption(token, universal));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeOptionCont);
