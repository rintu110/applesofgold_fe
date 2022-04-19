import * as constant from "constants/country";

const countryState = {
  countryAssign: [],
  countryName: "",
  countryCode: "",
  countryId: "",
  editCountry: false,
};

function countryReducer(state = countryState, action) {
  switch (action.type) {
    case constant.SET_EDIT_COUNTRY:
      return (state = {
        ...state,
        countryId: action.payload._id,
        countryName: action.payload.country_nm,
        countryCode: action.payload.code,
        editCountry: true,
      });
    case constant.SET_ASSIGNED_UNASSIGNED_COUNTRY:
      return (state = { ...state, countryAssign: action.payload });
    case constant.SET_COUNTRY_NAME:
      return (state = { ...state, countryName: action.payload });
    case constant.SET_COUNTRY_CODE:
      return (state = { ...state, countryCode: action.payload });
    case constant.RESET_COUNTRY_DATA:
      return (state = {
        ...state,
        countryName: "",
        countryCode: "",
        countryId: "",
        countryAssign: [],
        editCountry: false,
      });
    default:
      return state;
  }
}

export default countryReducer;
