import * as constant from "constants/universal";

const universalState = {
  snack: false,
  load: false,
  status: false,
  message: "",
  store: [],
  startingAfter: 0,
  searchKeyword: "",
  limit: 10,
  total: 0,
  assignUnassignedStore: [],
};

function universalReducer(state = universalState, action) {
  switch (action.type) {
    case constant.SET_ASSIGNED_AND_UNASSIGNED_STORE:
      return (state = { ...state, assignUnassignedStore: action.payload });
    case constant.SET_SEARCH_KEYWORD:
      return (state = { ...state, searchKeyword: action.payload });
    case constant.SET_DATA_STORE:
      return (state = { ...state, store: action.payload });
    case constant.SET_TOTAL:
      return (state = { ...state, total: action.payload });
    case constant.SET_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.RESET_EVERYTHING:
      return (state = {
        ...state,
        store: [],
        startingAfter: 0,
        limit: 10,
        total: 0,
        searchKeyword: "",
        assignUnassignedStore: [],
      });
    case constant.SET_SNACKBAR:
      return (state = {
        ...state,
        snack: true,
        status: action.payload.status,
        message: action.payload.message,
      });
    case constant.UNSET_SNACKBAR:
      return (state = {
        ...state,
        snack: false,
        status: false,
        message: "",
      });
    case constant.SET_LOADER:
      return (state = { ...state, load: true });
    case constant.UNSET_LOADER:
      return (state = { ...state, load: false });
    default:
      return state;
  }
}

export default universalReducer;
