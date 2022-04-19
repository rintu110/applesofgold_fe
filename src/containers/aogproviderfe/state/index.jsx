import React, { Component } from "react";
import { connect } from "react-redux";
import StateComp from "components/aogproviderfe/state";
import {
  viewState,
  setStateName,
  setStateCode,
  resetStateData,
  addState,
  setStateAssignUnassing,
  unassignedState,
  assignedState,
  setEditState,
  updateState,
  uploadCSV,
  exportCSV,
} from "actions/state";

class StateCont extends Component {
  render() {
    return <StateComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  state: store.stateReducer,
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
  updateState: (token, payload, universal) => {
    dispatch(updateState(token, payload, universal));
  },
  setEditState: (payload) => {
    dispatch(setEditState(payload));
  },
  assignedState: (token, payload, universal) => {
    dispatch(assignedState(token, payload, universal));
  },
  unassignedState: (token, payload, universal) => {
    dispatch(unassignedState(token, payload, universal));
  },
  setStateAssignUnassing: (payload) => {
    dispatch(setStateAssignUnassing(payload));
  },
  addState: (token, payload, universal) => {
    dispatch(addState(token, payload, universal));
  },
  viewState: (token, universal) => {
    dispatch(viewState(token, universal));
  },
  setStateName: (payload) => {
    dispatch(setStateName(payload));
  },
  setStateCode: (payload) => {
    dispatch(setStateCode(payload));
  },
  resetStateData: () => {
    dispatch(resetStateData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StateCont);
