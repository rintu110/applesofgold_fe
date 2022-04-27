import React, { Component } from "react";
import { connect } from "react-redux";
import CountryComp from "components/aogproviderfe/country";
import {
  viewCountry,
  addCountry,
  unassignedCountry,
  assignedCountry,
  updateCountry,
  uploadCSV,
  exportCSV,
} from "actions/country";

class CountryCont extends Component {
  render() {
    return <CountryComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
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
  updateCountry: (token, payload, universal, callBack) => {
    dispatch(updateCountry(token, payload, universal, callBack));
  },
  assignedCountry: (token, universal) => {
    dispatch(assignedCountry(token, universal));
  },
  unassignedCountry: (token, universal) => {
    dispatch(unassignedCountry(token, universal));
  },
  addCountry: (token, payload, universal, callBack) => {
    dispatch(addCountry(token, payload, universal, callBack));
  },
  viewCountry: (token, universal) => {
    dispatch(viewCountry(token, universal));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryCont);
