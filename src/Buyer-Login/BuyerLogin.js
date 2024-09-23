import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Error from "../Error/Error";
import Preloader from "../preloader/Preloader";
import Modal from "../Modal/Modal";
import Success from "../Sucess/Sucess";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import UpdateProfileOTP from "../updateProfileOTP/UpdateProfileOTP";
import { FormInput, FormButton } from "../Form-Input/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { updater } from "../utilities/utilities";
import { apiUrl } from "../utilities/utilities";
import { titleUpdater } from "../utilities/titleUpdater";
import { PhoneInput } from "../Form-Input/FormInput";
import countries from "../utilities/countries";
import "../Trader-Login/Login.css";
import AOS from "aos";
import "aos/dist/aos.css";

const BuyerLogin = () => {
  titleUpdater("Login with your Buyer Account");
  const isAuth = localStorage.getItem("isAuth");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [err2, setErr2] = useState(false);
  const [err2Msg, setErr2Msg] = useState("");
  const [success, setSuccess] = useState(false);
  const [succesMsg, setSuccessMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [otpmodal, setotpmodal] = useState(false);
  const [active1, setActive1] = useState("active");
  const [active2, setActive2] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const navigate = useNavigate();
  const entamarketToken = localStorage.getItem("entamarketToken");

  const errorHandler = (err, msg) => {
    setError(err);
    setErrorMsg(msg);
  };

  useEffect(() => {
    AOS.init();

    if (isAuth) {
      navigate("/buyerdashboard");
    } else {
      navigate("/buyerlogin");
    }
  }, [isAuth, navigate]);

  const formValidationHandler = (e) => {
    e.preventDefault();
    const emailAddress = e.target.email.value;
    const password = e.target.password.value;

    const loginData = {
      id: emailAddress,
      password: password,
    };

    if (emailAddress === "") {
      errorHandler(true, "Email Address is Required");
    } else if (password === "") {
      errorHandler(true, "Password is Required");
    } else {
      setLoader(true);
      setError(false);
      fetch(`${apiUrl}buyer/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.entamarketToken) {
            updater.TokenUpdaterHandler(resp.entamarketToken);
            navigate("/");
            setLoader(false);
            localStorage.setItem("isAuth", true);
          } else {
            setError(true);
            setErrorMsg(resp.msg);
            setLoader(false);
          }
        });
    }
  };

  const formPhoneHandler = (e) => {
    e.preventDefault();
    const phone = e.target.email.value;
    const password = e.target.password.value;
    const dailCode = e.target.dailCode.value;

    if (phone === "") {
      errorHandler(true, "Phone Number Required");
    } else if (password === "") {
      errorHandler(true, "Password is Required");
    } else {
      const loginData = {
        id: dailCode + phone,
        password: password,
      };
      setLoader(true);
      setError(false);
      fetch(`${apiUrl}buyer/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.entamarketToken) {
            updater.TokenUpdaterHandler(resp.entamarketToken);
            navigate("/");
            setLoader(false);
            localStorage.setItem("isAuth", true);
          } else {
            setError(true);
            setErrorMsg(resp.msg);
            setLoader(false);
          }
        });
    }
  };

  const showForgotPassModal = () => {
    setModal(true);
    setForgotModal(true);
    setSuccess(false);
  };

  const cancelModalHandler = () => {
    setModal(false);
    setotpmodal(false);
    setErr2(false);
    setErr2Msg("");
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const newPass = e.target.newPass.value;

    const passObj = {
      email: email,
      newPassword: newPass,
    };

    if (email === "") {
      setErr2(true);
      setErr2Msg("An email is required");
    } else if (newPass === "") {
      setErr2(true);
      setErr2Msg("A New Password is required");
    } else {
      setLoader(true);

      fetch(`${apiUrl}buyer/get-new-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passObj),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);

          if (resp.statusCode === 200) {
            setLoader(false);
            setErr2(false);
            setForgotModal(false);
            setotpmodal(true);
          } else {
            if (resp.statusCode === 400) {
              setErr2(true);
              setErr2Msg(resp.msg);
              setLoader(false);
            }
          }
        });
    }
  };

  const verifyUpdateEmailHandler = (e) => {
    e.preventDefault();
    const otpVal = e.target.otpUpdate.value;

    const otpData = {
      otp: otpVal,
    };

    if (otpVal === "") {
      setError(true);
      setErrorMsg("An Otp is required");
    } else {
      setLoader(true);

      fetch(`${apiUrl}buyer/dashboard/verify-update-otp`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpData),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);

          if (resp.statusCode === 200) {
            setLoader(false);
            setErr2(false);
            setSuccess(true);
            setSuccessMsg("Password have been Reseted");
            e.target.otpUpdate.value = "";
            setotpmodal(false);
            setModal(false);
          } else {
            if (resp.statusCode === 400) {
              setErr2(true);
              setErr2Msg(resp.msg);
              setLoader(false);
            }
          }
        });
    }
  };

  const phoneHandlerActiveForm = () => {
    if (active1 === "active") {
      setError(false, "");
      setActive1("");
      setActive2("active");
      setShowEmail(false);
    }
  };

  const EmailHandlerActiveForm = () => {
    if (active2 === "active") {
      setError(false, "");
      setActive1("active");
      setActive2("");
      setShowEmail(true);
    }
  };

  return (
    <div className="signup__container boxsign2">
      {loader ? <Preloader /> : null}

      {modal ? (
        <Modal closeModal={cancelModalHandler}>
          {forgotModal ? (
            <ForgotPasswordModal closeModal={cancelModalHandler}>
              {err2 ? <Error errMsg={err2Msg} /> : null}
              {success ? <Success succesMsg={succesMsg} /> : null}
              <form onSubmit={resetPasswordHandler}>
                <FormInput label="Email Address" name="email" />
                <FormInput
                  label="New Password"
                  name="newPass"
                  type="password"
                />
                <FormButton btnValue="Reset Password" />
              </form>
            </ForgotPasswordModal>
          ) : null}

          {otpmodal ? (
            <UpdateProfileOTP closeModal={cancelModalHandler}>
              {err2 ? <Error errMsg={err2Msg} /> : null}
              {success ? <Success succesMsg={succesMsg} /> : null}

              <div className="update__token">
                <h3>An OTP was sent to your email </h3>
              </div>

              <form onSubmit={verifyUpdateEmailHandler}>
                <FormInput name="otpUpdate" />
                <FormButton btnValue="Verify OTP" />
              </form>
            </UpdateProfileOTP>
          ) : null}
        </Modal>
      ) : null}

      <div className="signup__form" data-aos="fade-up">
        <div className="logoBox">
          <Logo width="160px" logoColor="#81007F" />
        </div>

        {showEmail ? (
          <form id="form__box" onSubmit={formValidationHandler}>
            <div className="signup_form-header">
              <h1>Buyer Login</h1>
              <p>
                Don't have an account? <Link to="/buyersignup">Sign up</Link>
              </p>
            </div>

            {error ? <Error errMsg={errorMsg} /> : null}

            <div className="login-with">
              <span
                className={["mail-login", active1].join(" ")}
                onClick={EmailHandlerActiveForm}
              >
                Email
              </span>
              <span
                className={["phone-login", active2].join(" ")}
                onClick={phoneHandlerActiveForm}
              >
                Phone Number
              </span>
            </div>

            <FormInput label="Email Address" name="email" />

            <FormInput label="Password" name="password" type="password" />

            <FormButton btnValue="Login" />

            <div className="forgot-passbox">
              <span onClick={showForgotPassModal}>Forgot Password?</span>
            </div>
          </form>
        ) : (
          <form id="form__box" onSubmit={formPhoneHandler}>
            <div className="signup_form-header">
              <h1>Buyer Login</h1>
              <p>
                Don't have an account? <Link to="/buyersignup">Sign up</Link>
              </p>
            </div>
            {error ? <Error errMsg={errorMsg} /> : null}
            <div className="login-with">
              <span
                className={["mail-login", active1].join(" ")}
                onClick={EmailHandlerActiveForm}
              >
                Email
              </span>
              <span
                className={["phone-login", active2].join(" ")}
                onClick={phoneHandlerActiveForm}
              >
                Phone Number
              </span>
            </div>
            <PhoneInput label="Phone Number" name="email">
              <select className="phoneInp" name="dailCode">
                {countries.map((country) => {
                  return (
                    <option
                      value={`${country.dial_code}-`}
                      key={country.dial_code}
                    >
                      {country.dial_code}
                    </option>
                  );
                })}
              </select>
            </PhoneInput>
            <FormInput label="Password" name="password" type="password" />
            <FormButton btnValue="Login" />
            <div className="forgot-passbox">
              <span onClick={showForgotPassModal}>Forgot Password?</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BuyerLogin;
