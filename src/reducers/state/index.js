import * as constant from "../../constants/state";

const stateState = {
  startingAfter: 0,
  limit: 10,
  total: 0,
  stateKeyWord: "",
  stateStore: [],
  stateAssign: [],
  stateName: "",
  stateCode: "",
  stateId: "",
  editState: false,
  deleteState: false,
};

function stateReducer(state = stateState, action) {
  switch (action.type) {
    case constant.SET_EDIT_STATE:
      return (state = {
        ...state,
        stateId: action.payload._id,
        stateName: action.payload.state_nm,
        stateCode: action.payload.code,
        editState: true,
      });
    case constant.SET_STATE_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_ASSIGNED_UNASSIGNED_STATE:
      return (state = { ...state, stateAssign: action.payload });
    case constant.SET_TOTAL_STATE:
      return (state = { ...state, total: action.payload });
    case constant.SET_STATE_KEYWORD:
      return (state = { ...state, stateKeyWord: action.payload });
    case constant.SET_STATE_STORE:
      return (state = { ...state, stateStore: action.payload });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.SET_STATE_NAME:
      return (state = { ...state, stateName: action.payload });
    case constant.SET_STATE_CODE:
      return (state = { ...state, stateCode: action.payload });
    case constant.RESET_STATE_DATA:
      return (state = {
        ...state,
        stateName: "",
        stateCode: "",
        stateKeyWord: "",
        stateId: "",
        stateAssign: [],
        editState: false,
        deleteState: false,
      });
    default:
      return state;
  }
}

export default stateReducer;
