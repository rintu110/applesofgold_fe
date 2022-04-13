import * as constant from "constants/categoryMeta";

const metaState = {
  metaStore: [],
  metaTitle: "",
  metaDesc: "",
  metaKeyword: "",
  metaSearchKeyword: "",
  metaCategoryId: 0,
  metaContent: "",
  metaEdit: false,
  metaId: "",
  startingAfter: 0,
  limit: 10,
  total: 0,
};

function categoryMetaReducer(state = metaState, action) {
  switch (action.type) {
    case constant.SET_META_CONTENT:
      return (state = { ...state, metaContent: action.payload });
    case constant.SET_META_TITLE:
      return (state = { ...state, metaTitle: action.payload });
    case constant.SET_META_DESC:
      return (state = { ...state, metaDesc: action.payload });
    case constant.SET_META_KEYWORD:
      return (state = { ...state, metaKeyword: action.payload });
    case constant.SET_CATEGORY_ID:
      return (state = { ...state, metaCategoryId: action.payload !== undefined && action.payload !== null && action.payload._id });
    case constant.SET_META_SEARCH_KEYWORD:
      return (state = { ...state, metaSearchKeyword: action.payload });
    case constant.SET_META_STORE:
      return (state = { ...state, metaStore: action.payload });
    case constant.SET_META_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.SET_TOTAL_META:
      return (state = { ...state, total: action.payload });
    case constant.RESET_META:
      return (state = {
        ...state,
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        metaCategoryId: 0,
        metaContent: "",
        metaEdit: false,
        metaId: "",
      });
    case constant.SET_EDIT_META:
      return (state = {
        ...state,
        metaTitle: action.payload.meta_title,
        metaDesc: action.payload.meta_desc,
        metaKeyword: action.payload.meta_keyword,
        metaCategoryId: action.payload.cat_id,
        metaEdit: true,
        metaId: action.payload._id,
        metaContent: action.payload.meta_content,
      });
    default:
      return state;
  }
}

export default categoryMetaReducer;
