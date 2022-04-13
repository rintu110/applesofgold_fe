import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import root from "@/reducers";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return root(state, action);
  }
};

// create a makeStore function
const makeStore = (context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// export an assembled wrapper
const store = createWrapper(makeStore);

export default store;
