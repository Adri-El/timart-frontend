import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import appleLogo from "../Assets/img/app2.png";
import androidLogo from "../Assets/img/play1.png";
import "./Join.css";

const Join = () => {
  return (
    <div className="joinContainer">
      <div className="logoJoin">
        <Logo width="160px" logoColor="#81007F" />
      </div>

      <div className="joinBox">
        <a href="https://entamarket.com/">Visit our website</a>
      </div>

      <div className="joinBox">
        <a href="https://play.google.com/store/apps/details?id=com.entamarket.Entamarket&pli=1">
          <div>
            <img src={androidLogo} alt="logo" width="110px" />
          </div>
          <span>Download on Play Store</span>
        </a>
      </div>

      <div className="joinBox">
        <a href="https://entamarket.com/">
          <div>
            <img src={appleLogo} alt="logo" width="110px" />
          </div>
          <span>Download on App Store</span>
        </a>
      </div>

      <div className="suportBox">
        <Link to="/support">Need help? Contact Support</Link>
      </div>
    </div>
  );
};

export default Join;
