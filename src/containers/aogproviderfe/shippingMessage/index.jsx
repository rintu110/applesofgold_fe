import React, { Component } from "react";
import { connect } from "react-redux";
import ShippingMessageComp from "components/aogproviderfe/shippingMessage";
import {
  viewShippingMessage,
  addShippingMessage,
  unassignedShippingMessage,
  assignedShippingMessage,
  updateShippingMessage,
  deleteShippingMessage,
  uploadCSV,
  exportCSV,
} from "actions/shippingMessage";

class ShippingMessageCont extends Component {
  render() {
    return <ShippingMessageComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deleteShippingMessage: (token, _id, universal) => {
    dispatch(deleteShippingMessage(token, _id, universal));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  updateShippingMessage: (token, payload, universal, callBack) => {
    dispatch(updateShippingMessage(token, payload, universal, callBack));
  },
  assignedShippingMessage: (token, universal) => {
    dispatch(assignedShippingMessage(token, universal));
  },
  unassignedShippingMessage: (token, universal) => {
    dispatch(unassignedShippingMessage(token, universal));
  },
  addShippingMessage: (token, payload, universal, callBack) => {
    dispatch(addShippingMessage(token, payload, universal, callBack));
  },
  viewShippingMessage: (token, universal) => {
    dispatch(viewShippingMessage(token, universal));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingMessageCont);
