import React, { useEffect, useState, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";
import HomeFooter from "../HomeFooter/HomeFooter";
import { apiUrl, convertPrice } from "../utilities/utilities";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../preloader/Preloader";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { preloaderActions } from "../Store/Preloader-Slice";
import { cartActions } from "../Store/Cart-Item-slice";
import Logo from "../Logo/Logo";
import Userbox from "../userbox/Userbox";
import { FormInp, TextArea, FormButton } from "../Form-Input/FormInput";
import Modal from "../Modal/Modal";
import { MdOutlineError } from "react-icons/md";
import "./CheckOutOverview.css";

const CheckOutOverview = () => {
  const navigate = useNavigate();
  const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
  const publicKey = "pk_live_c795ee5c2a919db2b0f18901be0c17503e601edf";
  const entamarketToken = localStorage.getItem("entamarketToken");
  const showLoader = useSelector((state) => state.loader.loaderShow);
  const [calcData, setCalcData] = useState([]);
  const [showCalc, setShowCalc] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [showUser, setShowUser] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showDeliv, setshowDeliv] = useState(false);
  const [showMainLandprice, setshowMainLandPrice] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [delivPath, setDelivPath] = useState("");
  const [isLogistics, setIsLogistics] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const dispatch = useDispatch();
  const firstname = useRef();
  const lastname = useRef();
  const phone = useRef();
  const location = useRef();
  const outLagosLocat = useRef();
  const testRef = useRef();

  let billData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: "",
    location: delivPath,
  };

  useEffect(() => {
    if (!entamarketToken) {
      navigate("/loginoptions");
    } else if (cartInfo.length === 0) {
      navigate("/");
    } else {
      dispatch(preloaderActions.loaderShowHandler(true));
      const cartVal = cartInfo.map((data) => {
        const obj = {
          productID: data.items._id,
          quantity: data.quant,
        };
        return obj;
      });
      cartVal.push(billData);
      fetch(`${apiUrl}purchase-calculator`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartVal),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.msg === "Unauthorized") {
            localStorage.removeItem("entamarketToken");
            localStorage.removeItem("isAuth");
            navigate("/loginoptions");
          } else {
            setShowCalc(true);
            setCalcData(resp.purchaseDetails);
            dispatch(preloaderActions.loaderShowHandler(false));
          }
        })
        .catch((error) => console.log(error));
    }

    const getUserInfo = () => {
      if (entamarketToken) {
        fetch(`${apiUrl}user/get-user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${entamarketToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (
              data.msg === "Unauthorized" ||
              data.msg === "This user doesn't exist" ||
              data.msg === "this user does not exist"
            ) {
            } else {
              setDataInfo(data.userData);
              setShowUser(true);
            }
          });
      }
    };

    getUserInfo();

    // eslint-disable-next-line
  }, [isRender]);

  const sendCartItems = () => {
    const cartVal = cartInfo.map((data) => {
      const obj = {
        productID: data.items._id,
        quantity: data.quant,
      };
      return obj;
    });

    cartVal.push(billData);

    fetch(`${apiUrl}checkout/checkout`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartVal),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log(error));
  };

  const totalPay = () => {
    if (showCalc) {
      return calcData.total * 100;
    } else {
      return 0;
    }
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: dataInfo.email ? dataInfo.email : "",
    amount: totalPay(),
    publicKey,
  };

  const onSuccess = () => {
    dispatch(preloaderActions.loaderShowHandler(false));
    sendCartItems();
    localStorage.removeItem("cartInfo");
    dispatch(cartActions.showCartHandler(false));
    navigate("/");
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  const MakePaymentHandler = (e) => {
    return (
      <div>
        <button
          className="paystack-button"
          onClick={() => {
            setIsSupport(false);
            if (
              firstname.current.value === "" ||
              lastname.current.value === "" ||
              phone.current.value === "" ||
              location.current.value === "" ||
              showMainLandprice === false
            ) {
              setShowError(true);
              setShowOptions(true);
            } else {
              billData = {
                firstName: firstname.current.value,
                lastName: lastname.current.value,
                phoneNumber: phone.current.value,
                deliveryAddress: location.current.value,
                location: delivPath,
                ref: config.reference,
              };
              initializePayment(onSuccess, onClose);
            }
          }}
        >
          Continue
        </button>
      </div>
    );
  };

  const LogoutHandler = () => {
    localStorage.removeItem("entamarketToken");
    localStorage.removeItem("isAuth");
    navigate("/loginoptions");
  };

  const showLagosoptions = (e) => {
    setIsSupport(false);
    setshowDeliv(true);
    setShowOptions(true);
  };

  const cancelModal = () => {
    setShowOptions(false);
    setshowDeliv(false);
    setShowError(false);
    setIsSupport(false);
  };

  const addMainLandLocation = (e) => {
    setIsRender(!isRender);
    setshowMainLandPrice(true);
    setIsLogistics(true);
    setshowDeliv(false);
    setShowOptions(false);
    billData = {
      firstName: firstname.current.value,
      lastName: lastname.current.value,
      phoneNumber: phone.current.value,
      deliveryAddress: location.current.value,
      location: "",
    };
    setDelivPath(e.target.value);
  };

  const outLagosHandler = () => {
    setshowMainLandPrice(true);
    setIsLogistics(false);
    setIsRender(!isRender);
    billData = {
      firstName: firstname.current.value,
      lastName: lastname.current.value,
      phoneNumber: phone.current.value,
      deliveryAddress: location.current.value,
      location: "",
    };
    setIsSupport(true);
    setShowOptions(true);
  };

  const goToSupport = () => {
    navigate("/support");
  };

  return (
    <div>
      {showLoader ? <Preloader /> : null}
      {showOptions ? (
        <Modal closeModal={cancelModal}>
          {showDeliv ? (
            <div className="modal-content">
              <h2>Select the part of Lagos for your Delivery</h2>

              <div className="check-box-main">
                <input
                  type="radio"
                  id="main"
                  name="locat"
                  value="Mainland"
                  onChange={addMainLandLocation}
                />
                <label htmlFor="main">Main Land</label>
              </div>

              <div className="check-box-main">
                <input
                  type="radio"
                  id="isl"
                  name="locat"
                  value="Island"
                  onChange={addMainLandLocation}
                />
                <label htmlFor="isl">Island</label>
              </div>
            </div>
          ) : null}

          {showError ? (
            <div className="error-content-box">
              <div className="error-content">
                <div className="error-icon-box-conbxmain">
                  <MdOutlineError className="error-icon" />
                </div>

                <span className="spantext">
                  Please fill in the Billing Information
                </span>
              </div>
            </div>
          ) : null}

          {isSupport ? (
            <div className="modal-content">
              <p className="contact__msg">
                For Delivery Outside of Lagos, Kindly Contact our Customer
                Support.
              </p>

              <FormButton btnValue="Customer Support" btnAction={goToSupport} />
            </div>
          ) : null}
        </Modal>
      ) : null}

      <div className="check-out-header">
        <Logo width="160px" logoColor="#81007F" />
        <div className="check-box">
          <Userbox
            userIcon={<FaUserAlt className="user-icon" />}
            className="user-sort"
            headerAccount={showUser ? `Hi ${dataInfo.username}` : null}
          />

          <div className="log-btn">
            <button className="logout__btn" onClick={LogoutHandler}>
              Logout{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="check-out-overiew-Box">
        <h3>Checkout</h3>
        <div className="overview__box">
          <div className="checkout-form">
            <div className="address-form">
              <h4>1. Delivery Location</h4>
              <div className="form-box">
                <p>Where do we deliver your Order?</p>

                <div className="check-box-main">
                  <input
                    type="radio"
                    id="lagos"
                    name="location"
                    ref={testRef}
                    onChange={showLagosoptions}
                  />
                  <label htmlFor="lagos">Within lagos</label>
                </div>

                <div className="check-box-main">
                  <input
                    type="radio"
                    id="outside"
                    name="location"
                    ref={outLagosLocat}
                  />
                  <label htmlFor="outside" onClick={outLagosHandler}>
                    Outside lagos
                  </label>
                </div>
              </div>
            </div>

            <div className="address-form">
              <h4>2. Billing Information</h4>
              <div className="form-box">
                <FormInp
                  labelname1="First Name"
                  labelname2="Last Name"
                  name1="firstName"
                  name2="lastName"
                  inp1Ref={firstname}
                  inp2Ref={lastname}
                />
                <div className="form__input">
                  <label>Phone Number</label>
                  <input ref={phone} />
                  <TextArea textRef={location} />
                </div>
              </div>
            </div>
          </div>

          <div className="priceinfo__box">
            <h4>ORDER SUMMARY</h4>
            <div className="cart__overview">
              {showCalc
                ? calcData.purchases.map((data) => {
                    return (
                      <div key={data.product._id} className="box-view-cont">
                        <div className="cart__overview-box">
                          <div className="cart__overview-img">
                            <img
                              src={data.product.images[0]}
                              alt="overview-img"
                            />
                          </div>
                          <div className="cart__overview-name">
                            <span> {data.product.name}</span>
                            <span>
                              <b>Price:</b> {convertPrice(data.product.price)}
                            </span>
                            <span>
                              <b>Quantity:</b> {data.quantity}
                            </span>
                            <span>
                              <b>Weight:</b> {Math.floor(data.product.weight)}Kg
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>

            <div className="transact__delivery-info">
              <span>
                <b>Transaction Fee:</b>{" "}
                {showCalc ? convertPrice(calcData.paymentGatewayFee) : null}{" "}
              </span>
            </div>

            {isLogistics ? (
              <div className="transact__delivery-info">
                <span>
                  <b>Logistics Cost:</b>{" "}
                  {showCalc ? convertPrice(calcData.logisticsFee) : null}{" "}
                </span>
              </div>
            ) : null}

            <hr />

            <div className="total-box">
              <h4>Total Price</h4>
              <span>{showCalc ? convertPrice(calcData.total) : null}</span>
            </div>

            <MakePaymentHandler />
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default CheckOutOverview;
