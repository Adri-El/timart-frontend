import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../../Form-Input/FormInput";
import Error from "../../Error/Error";
import { errorActions } from "../../Store/Error-Slice";
import { preloaderActions } from "../../Store/Preloader-Slice";
import Preloader from "../../preloader/Preloader";
import { apiUrl, updater } from "../../utilities/utilities";

const LogisticsLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showErr = useSelector((state) => state.error.showError);
  const showLoader = useSelector((state) => state.loader.loaderShow);
  const errMsg = useSelector((state) => state.error.errMsg);

  const loginAdminHandler = (userName, pass) => {
    const loginDetails = {
      username: userName,
      password: pass,
    };
    fetch(`${apiUrl}logistics/login`, {
      method: "PUT",
      body: JSON.stringify(loginDetails),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.statusCode !== 400) {
          dispatch(preloaderActions.loaderShowHandler(false));
          navigate("/logisticsdashboard");
          updater.TokenUpdaterHandler(resp.entamarketToken);
        } else {
          if (resp.msg === "wrong username or password") {
            dispatch(preloaderActions.loaderShowHandler(false));
            errorHandler(true, resp.msg);
          } else {
            dispatch(preloaderActions.loaderShowHandler(false));
            errorHandler(true, resp.errorData.msg);
          }
        }
      });
  };

  const errorHandler = (showerr, errmsg) => {
    dispatch(errorActions.setShowError(showerr));
    dispatch(errorActions.setErrMsg(errmsg));
  };

  const adminLoginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    if (email === "") {
      errorHandler(true, "Username is required");
    } else if (pass === "") {
      errorHandler(true, "Password is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      loginAdminHandler(email, pass);
    }
  };

  return (
    <div className="mainbox-login-container">
      <div className="main-login-logo">
        <Logo width="160px" logoColor="#81007F" />
      </div>

      <div className="mainbox-login">
        {showLoader ? <Preloader /> : null}

        <div>
          <h2>Logistics Login</h2>
          {showErr ? <Error errMsg={errMsg} /> : null}

          <div className="admin__login-form">
            <form onSubmit={adminLoginHandler}>
              <FormInput label="Username" name="email" />
              <FormInput label="Password" type="password" name="pass" />
              <FormButton btnValue="Login" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsLogin;
