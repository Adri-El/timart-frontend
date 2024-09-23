import { useState, useEffect } from "react";
import "./Trader.css";
import Logo from "../Logo/Logo";
import Error from "../Error/Error";
import { FormInp, FormInput, FormButton } from "../Form-Input/FormInput";
import Otp from "../otp/Otp";
import { Link, useNavigate } from "react-router-dom";
import Preloader from "../preloader/Preloader";
import { apiUrl } from "../utilities/utilities";
import { updater } from "../utilities/utilities";
import { titleUpdater } from "../utilities/titleUpdater";
import { PhoneInput } from "../Form-Input/FormInput";
import countries from "../utilities/countries";

const Trader = () => {
  titleUpdater("Seller Account Signup");
  const isAuth = localStorage.getItem("isAuth");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form1, setForm1] = useState(true);
  const [otpForm, setOtpForm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const errorHandler = (err, msg) => {
    setError(err);
    setErrorMsg(msg);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/traderdashboard");
    } else {
      navigate("/signup");
    }
  }, [isAuth, navigate]);

  const formValidationHandler = (e) => {
    e.preventDefault();
    const firstName = e.target.firstname.value;
    const lastName = e.target.lastname.value;
    const username = e.target.username.value;
    const emailAddress = e.target.email.value;
    const password = e.target.password.value;
    const phoneNumber = e.target.phonenumber.value;
    const dailCode = e.target.dailCode.value;

    if (firstName === "") {
      errorHandler(true, "First Name is Required");
    } else if (lastName === "") {
      errorHandler(true, "Last Name is Required");
    } else if (username === "") {
      errorHandler(true, "Username is Required");
    } else if (emailAddress === "") {
      errorHandler(true, "Email Address is Required");
    } else if (password === "") {
      errorHandler(true, "Password is Required");
    } else if (phoneNumber === "") {
      errorHandler(true, "Phone Number is Required");
    } else {
      setError(false);
      setShowLoader(true);

      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: emailAddress,
        password: password,
        phoneNumber: dailCode + phoneNumber,
      };

      fetch(`${apiUrl}trader/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.statusCode === 200) {
            let token = resp.entamarketToken;
            updater.TokenUpdaterHandler(token);
            setForm1(false);
            setOtpForm(true);
            setShowLoader(false);
          } else {
            setShowLoader(false);
            setError(true);
            setErrorMsg(resp.msg);
          }
        });
    }
  };

  return (
    <div className="signup__container mt-2">
      {showLoader ? <Preloader /> : null}

      {otpForm ? <Otp /> : null}

      {form1 ? (
        <div className="signup__form">
          <div className="logoBox">
            <Logo width="150px" logoColor="#81007F" />
          </div>

          <form id="form__box" onSubmit={formValidationHandler}>
            <div className="signup_form-header">
              <h1>Seller Sign up</h1>
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>

            {error ? <Error errMsg={errorMsg} /> : null}
            <FormInp
              labelname1="First Name"
              labelname2="Last Name"
              name1="firstname"
              name2="lastname"
            />

            <FormInput label="Username" name="username" />

            <FormInput label="Email Address" name="email" />

            <FormInput label="Password" name="password" type="password" />

            <PhoneInput label="Phone Number" name="phonenumber">
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

            <FormButton btnValue="Sign up" />

            <div className="checkBox-main">
              <label htmlFor="check">
                By <span className="text__inp">Signing Up</span>, you agree to
                receive emails from us.
              </label>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Trader;
