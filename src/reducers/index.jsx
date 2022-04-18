import { combineReducers } from "redux";
import universalReducer from "reducers/universal";
import loginReducer from "reducers/login";
import countryReducer from "reducers/country";
import categoryReducer from "reducers/category";
import categoryMetaReducer from "reducers/categoryMeta";
import productReducer from "reducers/product";
import stateReducer from "reducers/state";
import metaReducer from "reducers/meta";
import assignCatPrdReducer from "reducers/assignCatPrd";

const root = combineReducers({
  universalReducer,
  loginReducer,
  countryReducer,
  stateReducer,
  categoryReducer,
  categoryMetaReducer,
  metaReducer,
  productReducer,
  assignCatPrdReducer,
});

export default root;
