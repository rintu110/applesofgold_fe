import React, { Component } from "react";
import { connect } from "react-redux";
import CountryComp from "components/aogproviderfe/country";
import {
  viewCountry,
  setCountryName,
  setCountryCode,
  resetCountryData,
  addCountry,
  setCountryAssignUnassing,
  unassignedCountry,
  assignedCountry,
  setEditCountry,
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
  country: store.countryReducer,
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
  updateCountry: (token, payload, universal) => {
    dispatch(updateCountry(token, payload, universal));
  },
  setEditCountry: (payload) => {
    dispatch(setEditCountry(payload));
  },
  assignedCountry: (token, payload, universal) => {
    dispatch(assignedCountry(token, payload, universal));
  },
  unassignedCountry: (token, payload, universal) => {
    dispatch(unassignedCountry(token, payload, universal));
  },
  setCountryAssignUnassing: (payload) => {
    dispatch(setCountryAssignUnassing(payload));
  },
  addCountry: (token, payload, universal) => {
    dispatch(addCountry(token, payload, universal));
  },
  viewCountry: (token, universal) => {
    dispatch(viewCountry(token, universal));
  },
  setCountryName: (payload) => {
    dispatch(setCountryName(payload));
  },
  setCountryCode: (payload) => {
    dispatch(setCountryCode(payload));
  },
  resetCountryData: () => {
    dispatch(resetCountryData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryCont);
