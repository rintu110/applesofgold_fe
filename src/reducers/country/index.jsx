import * as constant from "constants/country";

const countryState = {
  startingAfter: 0,
  limit: 10,
  total: 0,
  countryKeyWord: "",
  countryStore: [],
  countryAssign: [],
  countryName: "",
  countryCode: "",
  countryId: "",
  editCountry: false,
  deleteCountry: false,
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
    case constant.SET_COUNTRY_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_ASSIGNED_UNASSIGNED_COUNTRY:
      return (state = { ...state, countryAssign: action.payload });
    case constant.SET_TOTAL_COUNTRY:
      return (state = { ...state, total: action.payload });
    case constant.SET_COUNTRY_KEYWORD:
      return (state = { ...state, countryKeyWord: action.payload });
    case constant.SET_COUNTRY_STORE:
      return (state = { ...state, countryStore: action.payload });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.SET_COUNTRY_NAME:
      return (state = { ...state, countryName: action.payload });
    case constant.SET_COUNTRY_CODE:
      return (state = { ...state, countryCode: action.payload });
    case constant.RESET_COUNTRY_DATA:
      return (state = {
        ...state,
        countryName: "",
        countryCode: "",
        countryKeyWord: "",
        countryId: "",
        countryAssign: [],
        editCountry: false,
        deleteCountry: false,
      });
    default:
      return state;
  }
}

export default countryReducer;
