import React from "react";
import { Route, Routes } from "react-router-dom";
// import AppBar from "../UI/AppBar";
import CountryCont from "../../containers/aogproviderfe/country";
import StateCont from "../../containers/aogproviderfe/state";
import CategoryCont from "../../containers/aogproviderfe/category";
import CategoryMetaCont from "../../containers/aogproviderfe/categoryMeta";
import AdminLogin from "../aogproviderfe/login";
import Snackbar from "../UI/SnackBar";
import Loader from "../UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import AdminDrawer from "../UI/adminDrawer";
import { getUserDetails } from "../../actions/login";

let body = "";

function Router() {
  const dispatch = useDispatch();

  const login = useSelector((store) => store.loginReducer);

  React.useEffect(() => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("token") !== ""
    ) {
      dispatch(getUserDetails(localStorage.getItem("token")));
    }
  }, []);

  if (
    ((login.user_token !== null &&
      login.user_token !== undefined &&
      login.user_token !== "") ||
      (localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== undefined &&
        localStorage.getItem("token") !== "")) &&
    ((login.user_type !== null &&
      login.user_type !== undefined &&
      login.user_type !== "") ||
      (localStorage.getItem("type") !== null &&
        localStorage.getItem("type") !== undefined &&
        localStorage.getItem("type") !== "")) &&
    (login.user_type === "A" ||
      login.user_type === "SA" ||
      localStorage.getItem("type") === "A" ||
      localStorage.getItem("type") === "SA")
  ) {
    body = (
      <AdminDrawer
        components={
          <Routes>
            <Route path="/" element={<>Hello backend World</>} />
            <Route path="/admin/country" element={<CountryCont />} />
            <Route path="/admin/state" element={<StateCont />} />
            <Route path="/admin/category" element={<CategoryCont />} />
            <Route path="/admin/category-meta" element={<CategoryMetaCont />} />
          </Routes>
        }
      />
    );
  } else if (
    ((login.user_token !== null &&
      login.user_token !== undefined &&
      login.user_token !== "") ||
      (localStorage.getItem("token") !== null &&
        localStorage.getItem("token") !== undefined &&
        localStorage.getItem("token") !== "")) &&
    ((login.user_type !== null &&
      login.user_type !== undefined &&
      login.user_type !== "") ||
      (localStorage.getItem("type") !== null &&
        localStorage.getItem("type") !== undefined &&
        localStorage.getItem("type") !== "")) &&
    (login.user_type === "U" || localStorage.getItem("type") === "U")
  ) {
    body = (
      <Routes>
        <Route path="/" element={<>Hello UI</>} />
      </Routes>
    );
  } else {
    body = (
      <Routes>
        <Route path="*" element={<AdminLogin />} />
      </Routes>
    );
  }

  return (
    <>
      <Snackbar />
      {body}
      <Loader />
    </>
  );
}

export default Router;
