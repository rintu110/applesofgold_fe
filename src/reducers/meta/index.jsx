import * as constant from "constants/meta";

const metaState = {
  metaTitle: "",
  metaContent: "",
  metaDesc: "",
  metaKeyword: "",
  metaEdit: false,
  metaId: "",
  metaForeignId: "",
};

function metaReducer(state = metaState, action) {
  switch (action.type) {
    case constant.SET_META_CONTENT:
      return (state = { ...state, metaContent: action.payload });
    case constant.SET_META_TITLE:
      return (state = { ...state, metaTitle: action.payload });
    case constant.SET_META_DESC:
      return (state = { ...state, metaDesc: action.payload });
    case constant.SET_META_KEYWORD:
      return (state = { ...state, metaKeyword: action.payload });
    case constant.SET_FOREGIN_ID:
      return (state = {
        ...state,
        metaForeignId:
          action.payload !== undefined &&
          action.payload !== null &&
          action.payload._id,
      });
    case constant.RESET_META:
      return (state = {
        ...state,
        metaTitle: "",
        metaDesc: "",
        metaKeyword: "",
        metaForeignId: "",
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
        metaForeignId: action.payload.foregin_id,
        metaEdit: true,
        metaId: action.payload._id,
        metaContent: action.payload.meta_content,
      });
    default:
      return state;
  }
}

export default metaReducer;
