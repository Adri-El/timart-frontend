import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error";
import Success from "../Sucess/Sucess";
import Logo from "../Logo/Logo";
import Preloader from "../preloader/Preloader";
import { updater } from "../utilities/utilities";
import { apiUrl } from "../utilities/utilities";

const BuyerOTP = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const entamarketToken = localStorage.getItem("entamarketToken");
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(30);
    }
  };

  const verifyOtpHandler = (e) => {
    e.preventDefault();
    const otpValue = e.target.otp.value;

    const otp = {
      otp: otpValue,
    };

    if (otpValue === "") {
      setError(true);
      setErrorMsg("Please Enter OTP Sent");
    } else {
      setError(false);
      setErrorMsg("");
      setShowLoader(true);
      resetTimer();

      fetch(`${apiUrl}buyer/signup/account-verification`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otp),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.entamarketToken) {
            updater.TokenUpdaterHandler(resp.entamarketToken);
            setShowLoader(false);

            if (resp.statusCode === 200) {
              navigate("/");
              localStorage.setItem("isAuth", true);
            } else {
              setError(true);
              setErrorMsg(resp.msg);
            }
          }
        });
    }
  };

  //reset otp handler
  const resendOtpHandler = () => {
    setShowLoader(true);
    fetch(`${apiUrl}buyer/signup/resend-otp`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.statusCode === 200) {
          updater.TokenUpdaterHandler(resp.entamarketToken);
          setSuccess(true);
          setError(false);
          setSuccessMsg("OTP have been resent to your email");
          setShowLoader(false);
        } else {
          setSuccess(false);
          setError(true);
          setErrorMsg(resp.msg);
          setShowLoader(false);
        }
      });
  };

  return (
    <div className="otpmainbox">
      <div className="logoBox">
        <Logo width="150px" logoColor="#81007F" />
      </div>

      <div className="otp-box">
        {showLoader ? <Preloader loaderText="" /> : null}
        <div className="textInfo">
          <h2>Verify your OTP</h2>
          <p>An OTP was sent to your Email Address kindly input it below</p>
        </div>

        {error ? <Error errMsg={errorMsg} /> : null}

        {success ? <Success succesMsg={successMsg} /> : null}

        <form onSubmit={verifyOtpHandler}>
          <div className="otp-box-input">
            <input name="otp" placeholder="Enter Otp" />
          </div>

          <div className="otp-box-input text-otp">
            {timer === 0 ? (
              <span className="resend-btn" onClick={resendOtpHandler}>
                Didnt get an Otp? Resend Otp
              </span>
            ) : (
              <span>Resend OTP in {timer} Seconds</span>
            )}
          </div>

          <div className="otp-box-input">
            <button>Verify Otp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerOTP;
