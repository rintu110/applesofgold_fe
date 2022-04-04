import { combineReducers } from "redux";
import universalReducer from "./universal";
import loginReducer from "./login";
import countryReducer from "./country";
import stateReducer from "./state";

const root = combineReducers({
  universalReducer,
  loginReducer,
  countryReducer,
  stateReducer,
});

export default root;
