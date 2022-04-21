import * as constant from "constants/attribute";

const attributeState = {
  prompt: "",
  code: "",
  label: "",
  labelCode: "",
  image: "",
  type: "",
  attributeId: "",
  editAttribute: false,
};

function attributeReducer(state = attributeState, action) {
  switch (action.type) {
    case constant.SET_ATTRIBUTE_LABEL_CODE:
      return (state = { ...state, labelCode: action.payload });
    case constant.SET_ATTRIBUTE_TYPE:
      return (state = { ...state, type: action.payload });
    case constant.SET_ATTRIBUTE_IMAGE:
      return (state = { ...state, image: action.payload });
    case constant.SET_ATTRIBUTE_LABEL:
      return (state = { ...state, label: action.payload });
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
        label: action.payload.label,
        image: action.payload.image,
        type: action.payload.attr_type,
        labelCode: action.payload.labelcode,
        editAttribute: true,
      });
    case constant.RESET_ATTRIBUTE_DATA:
      return (state = {
        ...state,
        prompt: "",
        code: "",
        attributeId: "",
        label: "",
        image: "",
        type: "",
        labelCode: "",
        editAttribute: false,
      });
    default:
      return state;
  }
}

export default attributeReducer;
