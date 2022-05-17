import React, { Component } from "react";
import { connect } from "react-redux";
import StateComp from "components/aogproviderfe/state";
import {
  viewState,
  addState,
  unassignedState,
  assignedState,
  updateState,
  uploadCSV,
  exportCSV,
  deleteState,
} from "actions/state";

class StateCont extends Component {
  render() {
    return <StateComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  login: store.loginReducer,
  universal: store.universalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  deleteState: (token, stateId, universal) => {
    dispatch(deleteState(token, stateId, universal));
  },
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, universal) => {
    dispatch(uploadCSV(token, csv, universal));
  },
  updateState: (token, payload, universal, callBack) => {
    dispatch(updateState(token, payload, universal, callBack));
  },
  assignedState: (token, universal) => {
    dispatch(assignedState(token, universal));
  },
  unassignedState: (token, universal) => {
    dispatch(unassignedState(token, universal));
  },
  addState: (token, payload, universal, callBack) => {
    dispatch(addState(token, payload, universal, callBack));
  },
  viewState: (token, universal) => {
    dispatch(viewState(token, universal));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StateCont);
