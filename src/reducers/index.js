import { combineReducers } from "redux";
import universalReducer from "./universal";
import loginReducer from "./login";
import countryReducer from "./country";
import categoryReducer from "./category";
import categoryMetaReducer from "./categoryMeta";
import stateReducer from "./state";

const root = combineReducers({
  universalReducer,
  loginReducer,
  countryReducer,
  stateReducer,
  categoryReducer,
  categoryMetaReducer,
});

export default root;
