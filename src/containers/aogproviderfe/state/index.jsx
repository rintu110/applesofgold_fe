import React, { Component } from "react";
import { connect } from "react-redux";
import StateComp from "components/aogproviderfe/state";
import {
  viewState,
  setStateName,
  setStateCode,
  resetStateData,
  setSearchKeyWord,
  addState,
  setStateAssignUnassing,
  unassignedState,
  assignedState,
  setStateLimit,
  setStateStartingAfter,
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
});

const mapDispatchToProps = (dispatch) => ({
  exportCSV: (token) => {
    dispatch(exportCSV(token));
  },
  uploadCSV: (token, csv, payload) => {
    dispatch(uploadCSV(token, csv, payload));
  },
  updateState: (token, payload) => {
    dispatch(updateState(token, payload));
  },
  setEditState: (payload) => {
    dispatch(setEditState(payload));
  },
  setStateLimit: (token, payload, limit) => {
    dispatch(setStateLimit(token, payload, limit));
  },
  setStateStartingAfter: (token, payload, startingAfter) => {
    dispatch(setStateStartingAfter(token, payload, startingAfter));
  },
  assignedState: (token, payload) => {
    dispatch(assignedState(token, payload));
  },
  unassignedState: (token, payload) => {
    dispatch(unassignedState(token, payload));
  },
  setStateAssignUnassing: (payload) => {
    dispatch(setStateAssignUnassing(payload));
  },
  addState: (token, payload) => {
    dispatch(addState(token, payload));
  },
  viewState: (token, startingAfter, limit, searchKeyWord) => {
    dispatch(viewState(token, startingAfter, limit, searchKeyWord));
  },
  setStateName: (payload) => {
    dispatch(setStateName(payload));
  },
  setStateCode: (payload) => {
    dispatch(setStateCode(payload));
  },
  setSearchKeyWord: (payload) => {
    dispatch(setSearchKeyWord(payload));
  },
  resetStateData: () => {
    dispatch(resetStateData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StateCont);
