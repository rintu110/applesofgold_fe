import * as constant from "../../constants/universal";

const universalState = {
  snack: false,
  load: false,
  status: false,
  message: "",
};

function universalReducer(state = universalState, action) {
  switch (action.type) {
    case constant.SET_SNACKBAR:
      return (state = {
        ...state,
        snack: true,
        status: action.payload.status,
        message: action.payload.message,
      });
    case constant.UNSET_SNACKBAR:
      return (state = {
        ...state,
        snack: false,
        status: false,
        message: "",
      });
    case constant.SET_LOADER:
      return (state = { ...state, load: true });
    case constant.UNSET_LOADER:
      return (state = { ...state, load: false });
    default:
      return state;
  }
}

export default universalReducer;
