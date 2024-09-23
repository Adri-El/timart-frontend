import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./loginAuthOptions.css";
import { titleUpdater } from "../utilities/titleUpdater";

const LoginAuthOptions = () => {
  titleUpdater("Entamarket - Login Options");
  const navigate = useNavigate();
  const goToSellerAccount = () => {
    navigate("/login");
  };
  const goToBuyerAccount = () => {
    navigate("/buyerlogin");
  };

  return (
    <div className="auth_mainbox">
      <div className="auth_logobox">
        <Logo width="160px" logoColor="#81007F" />
      </div>

      <div className="auth__options">
        <div className="main__options-box">
          <h2>Login as: </h2>

          <div className="auth__options-mainbox">
            <div
              className="auth__options-box buyer-box"
              onClick={goToBuyerAccount}
            >
              <span>Buyer</span>
            </div>

            <div
              className="auth__options-box seller-box"
              onClick={goToSellerAccount}
            >
              <span>Seller</span>
            </div>
          </div>
        </div>
      </div>

      <div className="no__account">
        <span>
          Don't Have an Account?{" "}
          <Link to="/SignupOptions" className="account__link">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginAuthOptions;
