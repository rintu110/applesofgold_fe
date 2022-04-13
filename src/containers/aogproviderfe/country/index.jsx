import React, { Component } from "react";
import { connect } from "react-redux";
import CountryComp from "components/aogproviderfe/country";
import {
  viewCountry,
  setCountryName,
  setCountryCode,
  resetCountryData,
  setSearchKeyWord,
  addCountry,
  setCountryAssignUnassing,
  unassignedCountry,
  assignedCountry,
  setCountryLimit,
  setCountryStartingAfter,
  setEditCountry,
  updateCountry,
} from "actions/country";

class CountryCont extends Component {
  render() {
    return <CountryComp {...this.props} />;
  }
}

const mapStateToProps = (store) => ({
  country: store.countryReducer,
  login: store.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  updateCountry: (token, payload) => {
    dispatch(updateCountry(token, payload));
  },
  setEditCountry: (payload) => {
    dispatch(setEditCountry(payload));
  },
  setCountryLimit: (token, payload, limit) => {
    dispatch(setCountryLimit(token, payload, limit));
  },
  setCountryStartingAfter: (token, payload, startingAfter) => {
    dispatch(setCountryStartingAfter(token, payload, startingAfter));
  },
  assignedCountry: (token, payload) => {
    dispatch(assignedCountry(token, payload));
  },
  unassignedCountry: (token, payload) => {
    dispatch(unassignedCountry(token, payload));
  },
  setCountryAssignUnassing: (payload) => {
    dispatch(setCountryAssignUnassing(payload));
  },
  addCountry: (token, payload) => {
    dispatch(addCountry(token, payload));
  },
  viewCountry: (token, startingAfter, limit, searchKeyWord) => {
    dispatch(viewCountry(token, startingAfter, limit, searchKeyWord));
  },
  setCountryName: (payload) => {
    dispatch(setCountryName(payload));
  },
  setCountryCode: (payload) => {
    dispatch(setCountryCode(payload));
  },
  setSearchKeyWord: (payload) => {
    dispatch(setSearchKeyWord(payload));
  },
  resetCountryData: () => {
    dispatch(resetCountryData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryCont);
