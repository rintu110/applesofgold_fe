import * as constant from "constants/product";

const productState = {
  productName: "",
  productDescription: "",
  productCode: "",
  productCategoryId: 0,
  productPrice: "",
  productCost: "",
  productWeight: "",
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
    case constant.SET_PRODUCT_STORE:
      return (state = { ...state, productStore: action.payload });
  }
}

export default productReducer;
