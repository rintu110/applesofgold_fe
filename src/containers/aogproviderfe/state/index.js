import React, { Component } from "react";
import { connect } from "react-redux";
import StateComp from "../../../components/aogproviderfe/state";
import Authrized from "../../../wrapper";
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
} from "../../../actions/state";

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

export default Authrized(
  connect(mapStateToProps, mapDispatchToProps)(StateCont)
);
