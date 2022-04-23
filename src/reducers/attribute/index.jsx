import * as constant from "constants/attribute";

const attributeState = {
  prompt: "",
  code: "",
  label: "",
  labelCode: "",
  image: "",
  type: "",
  price: "",
  cost: "",
  attributeId: "",
  optionId: "",
  allAttribute: [],
  editAttribute: false,
};

function attributeReducer(state = attributeState, action) {
  switch (action.type) {
    case constant.SET_ALL_ATTRIBUTES:
      const allattribute = action.payload.map(({ _id, prompt }) => ({
        _id: _id,
        label: prompt,
      }));
      return (state = { ...state, allAttribute: allattribute });
    case constant.SET_ATTRIBUTE_ID:
      return (state = {
        ...state,
        attributeId:
          action.payload !== null &&
          action.payload !== undefined &&
          action.payload._id,
      });
    case constant.SET_EDIT_ATTRIBUTE_OPTION:
      return (state = {
        ...state,
        prompt: action.payload.prompt,
        code: action.payload.code,
        attributeId: action.payload.attr_id,
        image: action.payload.image,
        price: action.payload.price,
        cost: action.payload.cost,
        optionId: action.payload._id,
        editAttribute: true,
      });
    case constant.SET_OPTION_PRICE:
      return (state = { ...state, price: action.payload });
    case constant.SET_OPTION_COST:
      return (state = { ...state, cost: action.payload });
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
        price: "",
        cost: "",
        optionId: "",
        allAttribute: [],
        editAttribute: false,
      });
    default:
      return state;
  }
}

export default attributeReducer;
