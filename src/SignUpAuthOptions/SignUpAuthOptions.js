import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../LoginAuthOptions/loginAuthOptions";
import { titleUpdater } from "../utilities/titleUpdater";

const SignUpAuthOptions = () => {
  titleUpdater("Entamarket - Signup Options");
  const navigate = useNavigate();
  const goToSellerAccount = () => {
    navigate("/signup");
  };
  const goToBuyerAccount = () => {
    navigate("/buyersignup");
  };
  return (
    <div className="auth_mainbox">
      <div className="auth_logobox">
        <Logo width="160px" logoColor="#81007F" />
      </div>

      <div className="auth__options">
        <div className="main__options-box">
          <h2>Sign up as:</h2>

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
          Already have an Account?{" "}
          <Link to="/loginoptions" className="account__link">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpAuthOptions;
