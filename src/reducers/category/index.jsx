import * as constant from "constants/category";

const categoryState = {
  categoryName: "",
  categoryCode: "",
  categoryParentId: 0,
  categoryContent: "",
  categoryID: "",
  categoryEdit: false,
  categoryStore: [],
  statingAfter: 0,
  limit: 10,
  total: 0,
  categoryAssign: [],
  allCatgory: [],
  categoryKeyWord: "",
};

function categoryReducer(state = categoryState, action) {
  switch (action.type) {
    case constant.SET_ALL_CATEGORY:
      const allcategory = action.payload.map(({ _id, category_nm }) => ({
        _id: _id,
        label: category_nm,
      }));
      return (state = { ...state, allCatgory: allcategory });
    case constant.SET_CATEGORY_STORE:
      return (state = { ...state, categoryStore: action.payload });
    case constant.SET_CATEGORY_NAME:
      return (state = { ...state, categoryName: action.payload });
    case constant.SET_CATEGORY_CODE:
      return (state = { ...state, categoryCode: action.payload });
    case constant.SET_CATEGORY_PARENT_ID:
      return (state = {
        ...state,
        categoryParentId:
          action.payload !== null &&
          action.payload !== undefined &&
          action.payload._id,
      });
    case constant.SET_CATEGORY_CONTENT:
      return (state = { ...state, categoryContent: action.payload });
    case constant.SET_TOTAL_CATEGORY:
      return (state = { ...state, total: action.payload });
    case constant.SET_CATEGORY_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, statingAfter: action.payload });
    case constant.SET_ASSIGNED_UNASSIGNED_CATEGORY:
      return (state = { ...state, categoryAssign: action.payload });
    case constant.RESET_CATEGORY:
      return (state = {
        ...state,
        categoryAssign: [],
        categoryKeyWord: "",
        categoryName: "",
        categoryCode: "",
        categoryParentId: 0,
        categoryContent: "",
        categoryID: "",
        categoryEdit: false,
      });
    case constant.SET_EDIT_CATEGORY:
      return (state = {
        ...state,
        categoryName: action.payload.category_nm,
        categoryCode: action.payload.code,
        categoryParentId: action.payload.parent_id,
        categoryContent: action.payload.page_content,
        categoryID: action.payload._id,
        categoryEdit: true,
      });
    case constant.SET_CATEGORY_KEYWORD:
      return (state = { ...state, categoryKeyWord: action.payload });
    default:
      return state;
  }
}

export default categoryReducer;
