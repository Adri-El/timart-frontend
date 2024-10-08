import Logo from "../../Logo/Logo";
import { Link } from "react-router-dom";
import { MdCall } from "react-icons/md";
import HomeFooter from "../../HomeFooter/HomeFooter";

const PrivacyPolicy = () => {
  return (
    <div className="terms__container">
      <div className="terms-header-box">
        <Logo width="160px" logoColor="#81007F" />

        <div className="terms-policy">
          <Link to="/terms-of-service" className="policy-link">
            Terms Of Service
          </Link>
          <Link to="/returns-policy" className="policy-link">
            Returns Policy
          </Link>
        </div>
      </div>
      <div className="termsOfService-box">
        <h2>Privacy Policy</h2>
        <p>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          <Link to="/" className="page-link">
            {" "}
            EntaMarket.com
          </Link>
          <br /> <br />
          When you visit the Site, we only collect Signup Information from you.
          These sign up information's are; Email Address, Phone Number, Country
          Dial Code We refer to this information as “Sign Up Information.”{" "}
          <br /> <br />
          Additionally, when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers, bank transfer, USSD), email address,
          and phone number. We refer to this information as “Order Information.”
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking about Signup Information and Order Information.
        </p>
      </div>
      <div className="termsOfService-box">
        <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
        <p>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and order confirmations). Additionally, we use this Order Information
          to:
          <br /> <br />
          <li>
            {" "}
            Communicate with you, Screen your orders for potential risk or fraud
          </li>
          <li> Screen our orders for potential risk or fraud</li>
          <li>
            When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
          <br /> <br />
        </p>
      </div>
      <div className="termsOfService-box">
        <h2> SHARING YOUR PERSONAL INFORMATION</h2>
        <p>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. We use:
          <br /> <br />
          <li> AWS Cloud Hosting for hosting our web application</li>
          <li> Sendgrid for email communications</li>
          <br />
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>
      </div>
      <div className="termsOfService-box">
        <h2>BEHAVIOURAL ADVERTISING</h2>
        <p>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at{" "}
          <a
            href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work."
            className="page-link"
          >
            {" "}
            Network Advertising Policy
          </a>
        </p>
      </div>

      <div className="termsOfService-box">
        <h2>DATA RETENTION</h2>
        <p>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </p>
      </div>

      <div className="termsOfService-box">
        <h2>MINORS</h2>
        <p>The Site is not intended for individuals under the age of 18.</p>
      </div>

      <div className="termsOfService-box">
        <h2>CHANGES</h2>
        <p>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
      </div>

      <div className="termsOfService-box">
        <h2>CONTACT US</h2>
        <p>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at <b>support@entamarket.com</b> or by mail using the
          details provided below:
          <br />
          <br />
          <span className="span-link"> TImart Limited</span>
          <br />
          <span className="span-link">support@entamarket.com</span>
          <br />
          <span className="span-link">
            Shop c20 kebi 1 Plaza Tradefair BBA Lagos, Nigeria.
          </span>
          <br />
          <span className="span-link">
            {" "}
            <MdCall className="call-icon" /> +234 906 3597 740
          </span>
        </p>
      </div>

      <HomeFooter />
    </div>
  );
};

export default PrivacyPolicy;
