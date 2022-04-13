import { combineReducers } from "redux";
import universalReducer from "reducers/universal";
import loginReducer from "reducers/login";
import countryReducer from "reducers/country";
import categoryReducer from "reducers/category";
import categoryMetaReducer from "reducers/categoryMeta";
import stateReducer from "reducers/state";

const root = combineReducers({
  universalReducer,
  loginReducer,
  countryReducer,
  stateReducer,
  categoryReducer,
  categoryMetaReducer,
});

export default root;
