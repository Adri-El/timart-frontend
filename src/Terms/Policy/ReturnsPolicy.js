import Logo from "../../Logo/Logo";
import HomeFooter from "../../HomeFooter/HomeFooter";
import { Link } from "react-router-dom";
import { MdCall } from "react-icons/md";

const ReturnsPolicy = () => {
  window.scrollTo(0, 0);
  return (
    <div className="terms__container">
      <div className="terms-header-box">
        <Logo width="160px" logoColor="#81007F" />

        <div className="terms-policy">
          <Link to="/terms-of-service" className="policy-link">
            Terms Of Service
          </Link>
          <Link to="/privacy-policy" className="policy-link">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="termsOfService-box">
        <h1>Returns Policy</h1>

        <p>
          We have a 5 days return policy, which means you have 5 days after
          receiving your item to request a return.
          <br /> <br />
          To be eligible for a return, your item must be in the same condition
          that you received it, unworn or unused, with tags, and in its original
          packaging. You’ll also need the receipt or proof of purchase. <br />{" "}
          <br />
          To start a return, you can contact us at support@entamarket.com . In
          the email, please specify your name, product name, order number (found
          in your purchase receipt), and pictures of the product, and showing
          defect(s) if applicable. Please note that returns will need to be sent
          to the following address: <b>support@entamarket.com</b>
          <br /> <br /> If your return is accepted, we’ll send you a return
          shipping label, as well as instructions on how and where to send your
          package. Please note that you are responsible for any shipping costs
          and related fees associated with your return. Entamarket or any of its
          affiliates will not be held liable for any losses incurred from lost
          packages that do not get to our office. <br /> <br />
          Items sent back to us without first requesting a return will not be
          accepted. You can always contact us for any return questions at
          support@entamarket.com.
        </p>
      </div>
      <div className="termsOfService-box">
        <h2>Damages and Issues</h2>
        <p>
          Please inspect your order upon receipt and contact us immediately if
          the item is defective, damaged, or if you receive the wrong item, so
          that we may evaluate the issue and make it right.
          <br /> <br /> Certain types of items cannot be returned, like
          perishable goods (such as food, flowers, or plants), custom products
          (such as special orders or personalized items), and personal care
          goods (such as beauty products). We also do not accept returns for
          hazardous materials, flammable liquids, or gases. Please get in touch
          if you have questions or concerns about your specific item.
        </p>
      </div>
      <div className="termsOfService-box">
        <h2>Exchanges</h2>
        <p>
          The fastest way to ensure you get what you want is to return the item
          you have, and once the return is accepted, make a separate purchase
          for the new item.
        </p>
      </div>
      <div className="termsOfService-box">
        <h2>Refunds</h2>
        <p>
          We will notify you once we’ve received and inspected your return to
          let you know if the refund was approved or not. If approved, you’ll be
          automatically refunded on your original payment method within 10
          business days. Please remember it can take some time for your bank or
          credit card company to process and post the refund too. <br /> <br />{" "}
          If more than 15 business days have passed since we’ve approved your
          return, please contact us at <b> support@entamarket.com</b>
          <br /> <br />
          <span className="span-link"> Entamarket Limited</span>
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

export default ReturnsPolicy;
