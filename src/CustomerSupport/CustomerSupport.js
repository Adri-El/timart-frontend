import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeFooter from "../HomeFooter/HomeFooter";
import { FormInput, FormButton } from "../Form-Input/FormInput";
import SupportImg from "../SupportImg/SupportImg";
import { apiUrl } from "../utilities/utilities";
import { errorActions } from "../Store/Error-Slice";
import { preloaderActions } from "../Store/Preloader-Slice";
import Error from "../Error/Error";
import Success from "../Sucess/Sucess";
import Preloader from "../preloader/Preloader";
import "./CustomerSupport.css";

const CustomerSupport = () => {
  const dispatch = useDispatch();
  const showErr = useSelector((state) => state.error.showError);
  const errMsg = useSelector((state) => state.error.errMsg);
  const showLoader = useSelector((state) => state.loader.loaderShow);
  const [isSuccess, setIsSuccess] = useState(false);
  const [succesMsg, setSuccessMsg] = useState("");
  const entamarketToken = localStorage.getItem("entamarketToken");

  const errorHandler = (showerr, errMsg) => {
    dispatch(errorActions.setShowError(showerr));
    dispatch(errorActions.setErrMsg(errMsg));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    errorHandler(false, "");

     // eslint-disable-next-line
  }, []);

  const sendRequestHandler = (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const supportData = {
      fullName,
      email,
      message,
    };

    if (fullName === "") {
      errorHandler(true, "Full name is required");
    } else if (email === "") {
      errorHandler(true, "Email is required");
    } else if (message === "") {
      errorHandler(true, "A Message is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      fetch(`${apiUrl}customer-support/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supportData),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.msg === "Unauthorized") {
            dispatch(preloaderActions.loaderShowHandler(false));
            errorHandler(true, "Login is required, Please login");
            e.target.reset();
          } else {
            dispatch(preloaderActions.loaderShowHandler(false));
            setIsSuccess(true);
            setSuccessMsg(
              "Request sent succesfully, You will get a feedback soon"
            );
            e.target.reset();
          }
        });
    }
  };
  return (
    <div>
      <HomeHeader />
      {showLoader ? <Preloader /> : null}

      <div className="support__box">
        <div className="support__box-2">
          <div className="support__form">
            <h2>Customer Support</h2>
            <div className="form__support">
              <form onSubmit={sendRequestHandler}>
                {showErr ? <Error errMsg={errMsg} /> : null}
                {isSuccess ? <Success succesMsg={succesMsg} /> : null}
                <FormInput label="Full Name" name="fullName" />
                <FormInput label="Email Address" name="email" />
                <div className="text-area-box">
                  <label>Tell us how we can help you?</label>
                  <textarea
                    rows="7"
                    cols="50"
                    name="message"
                    placeholder="How can we help you? "
                  ></textarea>
                </div>
                <FormButton btnValue="Submit Request" />
              </form>
            </div>
          </div>
          <SupportImg />
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default CustomerSupport;
