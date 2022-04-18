import * as constant from "constants/assignCatPrd";

const assignCatPrdState = {
  total: 0,
  limit: 10,
  prdId: "",
  catId: "",
  assignId: "",
  startingAfter: 0,
  assignCatPrdStore: [],
  assignUnAssignStore: [],
  assignCatPrdSearchKeyWord: "",
  editAssignCatPrd: false,
};

function assignCatPrdReducer(state = assignCatPrdState, action) {
  switch (action.type) {
    case constant.SET_ASSIGNED_UNASSIGNED_CAT_PRD:
      return (state = { ...state, assignUnAssignStore: action.payload });
    case constant.SET_ASSIGN_CAT_PRD_SEARCH_KEYWORD:
      return (state = { ...state, assignCatPrdSearchKeyWord: action.payload });
    case constant.SET_ASSIGN_CAT_PRD_STORE:
      return (state = { ...state, assignCatPrdStore: action.payload });
    case constant.SET_ASSIGN_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_ASSIGN_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.SET_EDIT_ASSIGN_CAT_PRD:
      return (state = {
        ...state,
        editAssignCatPrd: true,
        prdId: action.payload.prd_id,
        catId: action.payload.cat_id,
        assignId: action.payload._id,
      });
    case constant.SET_TOTAL_ASSIGN_CAT_PRD:
      return (state = { ...state, total: action.payload });
    case constant.RESET_CAT_PRD:
      return (state = {
        ...state,
        assignCatPrdSearchKeyWord: "",
        editAssignCatPrd: false,
        prdId: "",
        catId: "",
        assignId: "",
        assignUnAssignStore: [],
      });
    case constant.SET_ASSIGN_CAT_ID:
      return (state = {
        ...state,
        catId:
          action.payload !== null &&
          action.payload !== undefined &&
          action.payload._id,
      });
    case constant.SET_ASSIGN_PRD_ID:
      return (state = {
        ...state,
        prdId:
          action.payload !== null &&
          action.payload !== undefined &&
          action.payload._id,
      });
    default:
      return state;
  }
}

export default assignCatPrdReducer;
