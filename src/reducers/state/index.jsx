import * as constant from "constants/state";

const stateState = {
  stateAssign: [],
  stateName: "",
  stateCode: "",
  stateId: "",
  editState: false,
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
    case constant.SET_ASSIGNED_UNASSIGNED_STATE:
      return (state = { ...state, stateAssign: action.payload });
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
      });
    default:
      return state;
  }
}

export default stateReducer;
