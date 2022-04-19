import * as constant from "constants/assignCatPrd";

const assignCatPrdState = {
  prdId: "",
  catId: "",
  assignId: "",
  assignUnAssignStore: [],
  editAssignCatPrd: false,
};

function assignCatPrdReducer(state = assignCatPrdState, action) {
  switch (action.type) {
    case constant.SET_ASSIGNED_UNASSIGNED_CAT_PRD:
      return (state = { ...state, assignUnAssignStore: action.payload });
    case constant.SET_EDIT_ASSIGN_CAT_PRD:
      return (state = {
        ...state,
        editAssignCatPrd: true,
        prdId: action.payload.prd_id,
        catId: action.payload.cat_id,
        assignId: action.payload._id,
      });
    case constant.RESET_CAT_PRD:
      return (state = {
        ...state,
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
