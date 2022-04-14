import * as constant from "constants/product";

const productState = {
  productName: "",
  productDescription: "",
  productCode: "",
  productCategoryId: 0,
  productPrice: "",
  productCost: "",
  productWeight: "",
  productId: "",
  productTaxable: "",
  productAssign: [],
  productStore: [],
  allProduct: [],
  productEdit: false,
  startingAfter: 0,
  limit: 10,
  total: 0,
  productKeyword: "",
};

function productReducer(state = productState, action) {
  switch (action.type) {
    case constant.SET_PRODUCT_NAME:
      return (state = { ...state, productName: action.payload });
    case constant.SET_PRODUCT_CODE:
      return (state = { ...state, productCode: action.payload });
    case constant.SET_PRODUCT_COST:
      return (state = { ...state, productCost: action.payload });
    case constant.SET_PRODUCT_PRICE:
      return (state = { ...state, productPrice: action.payload });
    case constant.SET_PRODUCT_WEIGHT:
      return (state = { ...state, productWeight: action.payload });
    case constant.SET_PRODUCT_DESCRIPTION:
      return (state = { ...state, productDescription: action.payload });
    case constant.SET_PRODUCT_TAXABLE:
      return (state = { ...state, productTaxable: action.payload });
    case constant.SET_PRODUCT_CATEGORY_ID:
      return (state = {
        ...state,
        productCategoryId:
          action.payload !== null &&
          action.payload !== undefined &&
          action.payload._id,
      });
    case constant.SET_PRODUCT_ASSIGN_UNASSIGNED:
      return (state = { ...state, productAssign: action.payload });
    case constant.SET_PRODUCT_STORE:
      return (state = { ...state, productStore: action.payload });
    case constant.SET_EDIT_PRODUCT:
      return (state = {
        ...state,
        productName: action.payload.product_nm,
        productDescription: action.payload.prd_desc,
        productCode: action.payload.code,
        productCategoryId: action.payload.cat_id,
        productPrice: action.payload.price,
        productCost: action.payload.cost,
        productWeight: action.payload.weight,
        productTaxable: action.payload.taxable,
        productId: action.payload.product_id,
      });
    case constant.SET_STARTING_AFTER:
      return (state = { ...state, startingAfter: action.payload });
    case constant.SET_PRODUCT_LIMIT:
      return (state = { ...state, limit: action.payload });
    case constant.SET_TOTAL_PRODUCT:
      return (state = { ...state, total: action.payload });
    case constant.RESET_PRODUCT:
      return (state = {
        ...state,
        productName: "",
        productDescription: "",
        productCode: "",
        productCategoryId: 0,
        productPrice: "",
        productCost: "",
        productWeight: "",
        productTaxable: "",
        productAssign: [],
        productEdit: false,
        productKeyword: "",
        productId: "",
      });
    case constant.SET_PRODUCT_KEYWORD:
      return (state = { ...state, productKeyword: action.payload });
    case constant.SET_ALL_PRODUCT:
      return (state = { ...state, allProduct: action.payload });
    default:
      return state;
  }
}

export default productReducer;
