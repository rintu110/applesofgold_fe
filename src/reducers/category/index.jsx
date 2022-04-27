import * as constant from "constants/category";

const categoryState = {
  categoryName: "",
  categoryCode: "",
  categoryParentId: 0,
  categoryContent: "",
  categoryID: "",
  categoryEdit: false,
  allCatgory: [],
};

function categoryReducer(state = categoryState, action) {
  switch (action.type) {
    case constant.SET_ALL_CATEGORY:
      const allcategory = action.payload.map(({ _id, category_nm }) => ({
        _id: _id,
        label: category_nm,
      }));
      return (state = { ...state, allCatgory: allcategory });
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
    case constant.RESET_CATEGORY:
      return (state = {
        ...state,
        categoryAssign: [],
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
    default:
      return state;
  }
}

export default categoryReducer;
