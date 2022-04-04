import * as constant from "../../constants/login";

const loginState = {
  user_id: "",
  username: "",
  email: "",
  mobile: "",
  password: "",
  user_token: "",
  created_on: "",
  user_type: "",
  status: false,
};

function loginReducer(state = loginState, action) {
  switch (action.type) {
    case constant.SET_USER_DETAILS:
      return (state = {
        ...state,
        user_id: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        mobile: action.payload.mobile,
        password: action.payload.password,
        user_token: action.payload.user_token,
        created_on: action.payload.created_on,
        user_type: action.payload.user_type,
        status: action.payload.status,
      });
    default:
      return state;
  }
}

export default loginReducer;
