import { combineReducers } from "redux";
import universalReducer from "reducers/universal";
import loginReducer from "reducers/login";
import categoryReducer from "reducers/category";
import productReducer from "reducers/product";
import metaReducer from "reducers/meta";
import assignCatPrdReducer from "reducers/assignCatPrd";
import attributeReducer from "reducers/attribute";

const root = combineReducers({
  universalReducer,
  loginReducer,
  categoryReducer,
  metaReducer,
  productReducer,
  assignCatPrdReducer,
  attributeReducer,
});

export default root;
