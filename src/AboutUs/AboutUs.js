import React, { useEffect } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import AboutSvg from "../AboutSvg/AboutSvg";
import HomeFooter from "../HomeFooter/HomeFooter";
import "./AboutUs.css";
import { FormButton } from "../Form-Input/FormInput";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToSignUpOptions = () => {
    navigate("/SignupOptions");
  };
  return (
    <div className="about-us-box">
      <HomeHeader />

      <div className="about__page">
        <div className="about__box">
          <AboutSvg />
          <div className="about__details-box">
            <h3>About Us</h3>

            <div className="about__details">
              <p>
                We are the <b>Entamarket Trade Fair Service</b>, we bring the
                lagos trade fair complex very close and easy for you to buy,
                sell and interact with your favourite shops in the Trade Fair.{" "}
                <br /> <br /> We ensure that you get the best ecommerce service
                with our team of experts ready to deliver the best to you, with
                our quality customer support team which stands out from many
                ensuring that you get the best customer support experience.{" "}
                <br /> <br />
                <b>Entamarket Limited</b> also ensures all traders are properly
                vetted through our vetting process and ensuring that you own a
                real shop as a trader this enables us to reduce the risks of
                online Fraudsters We also ensure all payments are 100% secured
                by Pathnering with a reliable and accredited Fintech company
                <b> Paystack </b> to ensure your privacy and to even serve you
                better
              </p>

              <FormButton
                btnValue="Join Us Today"
                btnAction={goToSignUpOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default AboutUs;
