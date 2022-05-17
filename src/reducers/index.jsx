import { combineReducers } from "redux";
import universalReducer from "reducers/universal";
import loginReducer from "reducers/login";
import metaReducer from "reducers/meta";
import assignCatPrdReducer from "reducers/assignCatPrd";

const root = combineReducers({
  universalReducer,
  loginReducer,
  metaReducer,
  assignCatPrdReducer,
});

export default root;
