import * as constant from "constants/attribute";

const attributeState = {
  prompt: "",
  code: "",
  attributeId: "",
  editAttribute: false,
};

function attributeReducer(state = attributeState, action) {
  switch (action.type) {
    case constant.SET_ATTRIBUTE_PROMPT:
      return (state = { ...state, prompt: action.payload });
    case constant.SET_ATTRIBUTE_CODE:
      return (state = { ...state, code: action.payload });
    case constant.SET_EDIT_ATTRIBUTE:
      return (state = {
        ...state,
        prompt: action.payload.prompt,
        code: action.payload.code,
        attributeId: action.payload._id,
        editAttribute: true,
      });
    case constant.RESET_ATTRIBUTE_DATA:
      return (state = {
        ...state,
        prompt: "",
        code: "",
        attributeId: "",
        editAttribute: false,
      });
    default:
      return state;
  }
}

export default attributeReducer;
