import React, { useState, useEffect, useRef } from "react";
import { convertPrice, updater } from "../utilities/utilities";
import { useNavigate } from "react-router-dom";
import Preloader from "../preloader/Preloader";
import Modal from "../Modal/Modal";
import Error from "../Error/Error";
import Sucess from "../Sucess/Sucess";
import DeleteModal from "../DeleteModal/DeleteModal";
import NoticeModal from "../NoticeModal/NoticeModal";
import UpdateSellerModal from "../updateSellerModal/UpdateSellerModal";
import UpdateProfileOTP from "../updateProfileOTP/UpdateProfileOTP";
import UpdatePasswordModal from "../UpdatePasswordModal/UpdatePasswordModal";
import { FormInput, FormButton } from "../Form-Input/FormInput";
import EmailUpdateModal from "../EmailUpdateModal/EmailUpdateModal";
import {
  FaSortDown,
  FaTrashAlt,
  FaRegBell,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { ImHome } from "react-icons/im";
import {
  MdViewHeadline,
  MdClear,
  MdOutlineReceipt,
  MdOutlineRedeem,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import NoRecords from "../NoRecords/NoRecords";
import DashboardActivity from "../DashboardActivity/DashboardAcitivity";
import Userbox from "../userbox/Userbox";
import SidebarNav from "../SidebarNav/Sidebarnav";
import ShopBox from "../ShopBox/Shopbox";
import Logo from "../Logo/Logo";
import { apiUrl } from "../utilities/utilities";
import { BiSupport } from "react-icons/bi";
import Subscribe from "../Subscription/Subscribe/Subscribe";
import { titleUpdater } from "../utilities/titleUpdater";
import { PurchaseModal } from "../PurchaseModal/PurchaseModal";
import { months } from "../utilities/utilities";
import ShowItems from "../ShowItems/ShowItems";

const BuyerDashboard = () => {
  const [traderData, setTraderData] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [removeDelete, setRemoveDelete] = useState(true);
  const [removeNoticeInfo, setRemoveNoticeInfo] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [showSideBar, setShowSideBar] = useState("traderdashboard__sidebar");
  const [SideActive, setSideActive] = useState("");
  const [showRecords, setShowRecords] = useState(false);
  const [removeShopItem, setRemoveShopItem] = useState("");
  const [sellerProfile, setSellerProfile] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [OtpModal, setOtpModal] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [purchaseArr, setPurchaseArr] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [showOrderInfo, setShowOrderInfo] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [pendDeliveryCount, setPendDelivery] = useState(0);
  const [showSub, setShowSub] = useState(false);
  const [modalType, setModalType] = useState("");
  const [confirmDeliv, setIsConfirmDeliv] = useState(false);
  const [historyBuyer, sethistoryBuyer] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);
  const [isShowFull, setIshowfull] = useState(false);
  const [countPurch, setCountPurch] = useState(0);
  const [isShowItems, setIsShowItems] = useState(false);

  let linkUrl = "";
  titleUpdater("TImart - Buyer Dashboard");

  let fName = useRef();
  let lName = useRef();
  let UName = useRef();
  let Uphone = useRef();
  let linkRef = useRef();
  const navigate = useNavigate();
  const entamarketToken = localStorage.getItem("entamarketToken");

  const getBuyerInfo = () => {
    setShowLoader(true);
    fetch(`${apiUrl}buyer/dashboard`, {
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
          setTraderData(resp.buyerData);
          setShowShop(true);
          setShowLoader(false);
        } else {
          localStorage.removeItem("entamarketToken");
          localStorage.removeItem("isAuth");
          navigate("/buyerlogin");
        }
      })
      .catch((error) => console.log(error));
  };

  const getPendingOrders = () => {
    fetch(`${apiUrl}delivery/get-pending-deliveries?set=${pendDeliveryCount}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg === "no more pending deliveries") {
          setShowLoader(false);
          setShowRecords(false);
        } else {
          setPurchaseArr(resp.pendingDeliveries);
          setShowRecords(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const getBuyerHistory = () => {
    fetch(`${apiUrl}buyer/get-purchase-history?set=${countPurch}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        sethistoryBuyer(resp.purchaseHistoryData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBuyerInfo();
    getPendingOrders();
    getBuyerHistory();

    // eslint-disable-next-line
  }, [shouldRender, pendDeliveryCount, countPurch]);

  //Delete Trader Hanlder
  const deleteTraderHandler = () => {
    fetch(`${apiUrl}buyer/dashboard/delete-account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.statusCode === 200) {
          localStorage.removeItem("entamarketToken");
          localStorage.removeItem("isAuth");
          navigate("/buyersignup");
        }
      });
  };

  //Show Modal Handler
  const showModalHandler = () => {
    setShowModal(true);
    setRemoveDelete(true);
  };

  //Cancel Modal Handler
  const cancelModalHandler = () => {
    setShowModal(false);
    setRemoveDelete(false);
    setRemoveNoticeInfo(false);
    setError(false);
    setSuccess(false);
    setShowSellerModal(false);
    setEmailModal(false);
    setOtpModal(false);
    setPassModal(false);
    setShowSub(false);
    setIsConfirmDeliv(false);
  };

  //show Notification Handler
  const showNotificationHandler = () => {
    setShowModal(true);
    setRemoveDelete(false);
    setRemoveNoticeInfo(true);
  };

  // Logout Handler
  const logOutHandler = () => {
    localStorage.removeItem("entamarketToken");
    localStorage.removeItem("isAuth");
    navigate("/buyerlogin");
  };

  //Show SideBar Handler
  const showSideBarHandler = () => {
    setSideActive("sideBar__active");
    setShowSideBar("traderdashboard__sidebar");
  };

  //Remove SideBar Handler
  const removeSideBar = () => {
    setSideActive("");
  };

  const traderProfileHandler = () => {
    setRemoveShopItem("removeShopItem");
    setSellerProfile(true);
  };

  const closeSellerProfile = () => {
    setSellerProfile(false);
    setRemoveShopItem("");
  };

  const showSellModalHandler = () => {
    setShowModal(true);
    setShowSellerModal(true);
    setShowLoader(true);

    setTimeout(() => {
      fName.current.value = traderData.firstName;
      lName.current.value = traderData.lastName;
      UName.current.value = traderData.username;
      Uphone.current.value = traderData.phoneNumber;
      setShowLoader(false);
    }, 1000);
  };

  const updateSellerProfileData = (e) => {
    e.preventDefault();

    const firstName = fName.current.value;
    const lastName = lName.current.value;
    const userName = UName.current.value;
    const phoneNumber = Uphone.current.value;

    const sellerObj = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      phoneNumber: phoneNumber,
    };

    if (firstName === "") {
      setError(true);
      setErrorMsg("First Name is Required");
    } else if (lastName === "") {
      setError(true);
      setErrorMsg("Last Name is Required");
    } else if (userName === "") {
      setError(true);
      setErrorMsg("Username is Required");
    } else if (phoneNumber === "") {
      setError(true);
      setErrorMsg("Phone Number is Required");
    } else {
      setError(false);
      setErrorMsg("");
      setShowLoader(true);

      fetch(`${apiUrl}buyer/dashboard/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellerObj),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);

          if (resp.statusCode === 200) {
            setShouldRender(!shouldRender);
            setShowLoader(false);
            setSuccess(true);
            setSuccessMsg("Seller Profile Updated");
          } else {
            if (resp.statusCode === 400) {
              setError(true);
              setErrorMsg(resp.msg);
              setShowLoader(false);
            }
          }
        });
    }
  };

  const updateEmailHandler = (e) => {
    e.preventDefault();
    const updateEmail = e.target.emailUpdate.value;
    const updatePass = e.target.passUpdate.value;
    setModalType("mail");
    const updateData = {
      email: updateEmail,
      password: updatePass,
    };

    if (updateEmail === "") {
      setError(true);
      setErrorMsg("An Email is Required");
    } else if (updatePass === "") {
      setError(true);
      setErrorMsg("Password is Required");
    } else {
      setError(false);
      setErrorMsg("");
      setShowLoader(true);

      fetch(`${apiUrl}buyer/dashboard/update-email`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);

          if (resp.statusCode === 200) {
            setShowLoader(false);
            setEmailModal(false);
            setOtpModal(true);
          } else {
            if (resp.statusCode === 400) {
              setError(true);
              setErrorMsg(resp.msg);
              setShowLoader(false);
            } else {
              if (
                resp.msg ===
                "You need to subscribe to our email services to recieve OTP"
              ) {
                setShowLoader(false);
                setEmailModal(false);
                setShowSub(true);
              } else {
                setShowLoader(false);
              }
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
      setShowLoader(true);

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
            setShouldRender(!shouldRender);
            setShowLoader(false);
            setError(false);
            setSuccess(true);
            setSuccessMsg("Profile have been Updated");
            e.target.otpUpdate.value = "";
          } else {
            if (resp.statusCode === 400) {
              setError(true);
              setErrorMsg(resp.msg);
              setShowLoader(false);
            }
          }
        });
    }
  };

  const showSellerEmailModal = () => {
    setShowModal(true);
    setEmailModal(true);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  const showSellerPassModal = () => {
    setShowModal(true);
    setPassModal(true);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    const oldPass = e.target.oldPass.value;
    const newPass = e.target.newPass.value;
    setModalType("pass");

    const newPassObj = {
      oldPassword: oldPass,
      newPassword: newPass,
    };

    if (oldPass === "") {
      setError(true);
      setErrorMsg("An Old Password is Required");
    } else if (newPass === "") {
      setError(true);
      setErrorMsg("A New Password is Required");
    } else {
      setShowLoader(true);

      fetch(`${apiUrl}buyer/dashboard/update-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassObj),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);

          if (resp.statusCode === 200) {
            setShowLoader(false);
            setPassModal(false);
            setOtpModal(true);
            setError(false);
          } else {
            if (resp.statusCode === 400) {
              setError(true);
              setErrorMsg(resp.msg);
              setShowLoader(false);
            } else {
              if (
                resp.msg ===
                "You need to subscribe to our email services to recieve OTP"
              ) {
                setPassModal(false);
                setShowSub(true);
                setShowLoader(false);
              }
            }
          }
        });
    }
  };

  const getOrderDetails = (id) => {
    setShowLoader(true);
    setOrderId(id);
    fetch(`${apiUrl}delivery/get-single-pending-delivery?checkoutID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg === "Unauthorized") {
          navigate("/buyerlogin");
        } else {
          setShowLoader(false);
          setShowOrderInfo(true);
          setOrderInfo(resp.pendingDelivery.purchases);
        }
      });
  };

  const closeOrderModal = () => {
    setShowOrderInfo(false);
  };

  const showConfirmDeliveryModal = () => {
    setIsConfirmDeliv(true);
    setShowOrderInfo(false);
    setShowModal(true);
  };

  const confirmDelivery = () => {
    setShowLoader(true);
    fetch(`${apiUrl}delivery/confirm-delivery?checkoutID=${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setShowLoader(false);
        setShowOrderInfo(false);
        setShouldRender(!shouldRender);
        setIsConfirmDeliv(false);
        setShowModal(false);
      });
  };

  const goToSupporPage = () => {
    navigate("/support");
  };

  const loadMorePendingOrders = () => {
    setPendDelivery(pendDeliveryCount + 1);
  };

  const loadmoreOrderHistory = () => {
    setCountPurch(countPurch + 1);
  };

  const bacToPreviousLoaded = () => {
    if (pendDeliveryCount === 0) {
      setPendDelivery(0);
    } else {
      setPendDelivery(pendDeliveryCount - 1);
    }
  };

  const backHistoryBuyer = () => {
    if (countPurch === 0) {
      setCountPurch(0);
    } else {
      setCountPurch(countPurch - 1);
    }
  };

  const subscribeHandler = () => {
    setShowLoader(true);

    fetch(`${apiUrl}email-subscription/subscribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (modalType === "pass") {
          setPassModal(true);
          setShowSub(false);
          setShowLoader(false);
        } else if (modalType === "mail") {
          setShowSub(false);
          setShowLoader(false);
          setEmailModal(true);
        }
      });
  };
  const showFullHistrory = (item) => {
    console.log(item);
    setFullHistory(item);
    setIsShowItems(true);
  };
  const closeShowItems = () => {
    setIsShowItems(false);
  };

  const closePurchaseModal = () => {
    setIshowfull(false);
  };

  const getReceiptAppHandler = (id) => {
    setShowLoader(true);
    fetch(`${apiUrl}buyer/get-receipt?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/pdf",
      },
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        linkRef.current.href = url;
        linkRef.current.click();
        setShowLoader(false);
      });
  };

  return (
    <div className="Trader_dashboard">
      <a href={linkUrl} ref={linkRef} download="invoice" hidden>
        download
      </a>

      {isShowFull ? (
        <PurchaseModal
          info={fullHistory}
          close={closePurchaseModal}
          typeName="Transaction Details"
          fullName={`${traderData.firstName} ${traderData.lastName}`}
          getReceiptAppHandler={getReceiptAppHandler}
        />
      ) : null}

      {showLoader ? <Preloader /> : null}

      {isShowItems ? (
        <ShowItems closeShowItems={closeShowItems} fullHistory={fullHistory} />
      ) : null}

      {showOrderInfo ? (
        <div>
          <div className="order__prodmodal" onClick={closeOrderModal}></div>
          <div className="order__modal-content">
            <div className="close__modal">
              <FaTimes className="close__icon" onClick={closeOrderModal} />
            </div>
            <h3 className="pending-header pend2Text">Pending Order Details</h3>

            <div className="orderIDBox">
              <h4>Order ID: {orderId}</h4>
            </div>

            {orderInfo.map((orderData) => {
              return (
                <div key={orderData.product._id} className="orderboxMain12">
                  <div className="order__main-box">
                    <div className="order__img-box">
                      <img src={orderData.product.images[0]} alt="order-img" />
                    </div>

                    <div className="order__prodinfo">
                      <p>Product Name: {orderData.product.name}</p>
                      <p>Product Category: {orderData.product.category}</p>
                      <p>
                        Product Price: {convertPrice(orderData.product.price)}
                      </p>
                      <p>Order Quantity: {orderData.quantity}</p>
                    </div>
                  </div>
                  <h3 className="pending-header mainPendTextB">
                    Product Seller Details
                  </h3>

                  <div className="seller__details">
                    <p>
                      Full Name:{" "}
                      {orderData.trader.firstName +
                        " " +
                        orderData.trader.lastName}
                    </p>
                    <p>Phone Number: {orderData.trader.phoneNumber}</p>
                    <p>Username: {orderData.trader.username}</p>
                  </div>

                  <div className="trackBox">
                    <h4 className="mainPendTextB">Tracking Status</h4>
                    <div className="bxtrack">
                      <div>
                        <span
                          className={
                            orderData.trackingStatus === "trader"
                              ? "yes"
                              : "yes"
                          }
                        >
                          Product with Seller
                        </span>
                        <div className="bxtracki">
                          <div
                            className={
                              orderData.trackingStatus === "trader"
                                ? "bxtrack1 activ"
                                : "bxtrack1 activ"
                            }
                          ></div>
                          <div
                            className={
                              orderData.trackingStatus === "trader"
                                ? "trackDiv trackDiv1 activ"
                                : "trackDiv trackDiv1 activ"
                            }
                          ></div>
                        </div>
                      </div>

                      <div>
                        <span
                          className={
                            orderData.trackingStatus === "logistics"
                              ? "yes"
                              : ""
                          }
                        >
                          Picked up for delivery
                        </span>
                        <div className="bxtracki">
                          <div
                            className={
                              orderData.trackingStatus === "logistics"
                                ? "bxtrack1 activ"
                                : "bxtrack1"
                            }
                          ></div>
                          <div
                            className={
                              orderData.trackingStatus === "logistics"
                                ? "trackDiv trackDiv1 activ"
                                : "trackDiv trackDiv1"
                            }
                          ></div>
                        </div>
                      </div>

                      <div>
                        <span>Delivery complete</span>
                        <div className="bxtracki">
                          <div className="bxtrack1"></div>
                          <div className="trackDiv trackDiv1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="confirm__box">
              <p className="note__text">
                <span>Note</span>: Click the button below when you have recieved
                the product to confirm delivery.
              </p>

              <button
                className="confirm__btn"
                onClick={showConfirmDeliveryModal}
              >
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showModal ? (
        <Modal closeModal={cancelModalHandler}>
          {removeDelete ? (
            <DeleteModal
              accountType="Buyer"
              titleText1="Are you sure you want to Delete your"
              titleText2="Account?"
              deleteHandler={deleteTraderHandler}
              cancelHandler={cancelModalHandler}
              btnValue="Delete Account"
              note="Note that account deleted cannot be recovered"
            />
          ) : null}

          {removeNoticeInfo ? (
            <NoticeModal closeModal={cancelModalHandler} />
          ) : null}

          {showSellerModal ? (
            <UpdateSellerModal closeModal={cancelModalHandler}>
              {error ? <Error errMsg={errorMsg} /> : null}
              {success ? <Sucess succesMsg={successMsg} /> : null}

              <form onSubmit={updateSellerProfileData}>
                <div className="form__input">
                  <label>Update First Name</label>
                  <input ref={fName} name="uFirstname" />
                </div>

                <div className="form__input">
                  <label>Update Last Name</label>
                  <input ref={lName} name="ulastname" />
                </div>

                <div className="form__input">
                  <label>Update Username</label>
                  <input ref={UName} name="uUsername" />
                </div>

                <div className="form__input">
                  <label>Update Phone Number</label>
                  <input ref={Uphone} name="uPhone" />
                </div>

                <FormButton btnValue="Update Profile" />
              </form>
            </UpdateSellerModal>
          ) : null}

          {emailModal ? (
            <EmailUpdateModal closeModal={cancelModalHandler}>
              <form onSubmit={updateEmailHandler}>
                {error ? <Error errMsg={errorMsg} /> : null}
                {success ? <Sucess succesMsg={successMsg} /> : null}

                <FormInput label="New Email Address" name="emailUpdate" />
                <FormInput label="Password" name="passUpdate" type="password" />
                <FormButton btnValue="Update Email" />
              </form>
            </EmailUpdateModal>
          ) : null}

          {OtpModal ? (
            <UpdateProfileOTP closeModal={cancelModalHandler}>
              {error ? <Error errMsg={errorMsg} /> : null}
              {success ? <Sucess succesMsg={successMsg} /> : null}

              <div className="update__token">
                <h3>An OTP was sent to your email </h3>
              </div>

              <form onSubmit={verifyUpdateEmailHandler}>
                <FormInput name="otpUpdate" />
                <FormButton btnValue="Verify OTP" />
              </form>
            </UpdateProfileOTP>
          ) : null}

          {passModal ? (
            <UpdatePasswordModal closeModal={cancelModalHandler}>
              {error ? <Error errMsg={errorMsg} /> : null}
              {success ? <Sucess succesMsg={successMsg} /> : null}

              <form onSubmit={updatePasswordHandler}>
                <FormInput
                  label="Enter Old Password"
                  name="oldPass"
                  type="password"
                />
                <FormInput
                  label="Enter New Password"
                  name="newPass"
                  type="password"
                />
                <FormButton btnValue="Update Password" />
              </form>
            </UpdatePasswordModal>
          ) : null}

          {showSub ? (
            <Subscribe
              closeModal={cancelModalHandler}
              subscribeHandler={subscribeHandler}
            />
          ) : null}

          {confirmDeliv ? (
            <DeleteModal
              titleText1="Confirm Deivery"
              note="Are you sure you want to confirm this delivery, ensure to have received the order before confirming."
              btnValue="Yes, Confirm"
              cancelHandler={cancelModalHandler}
              deleteHandler={confirmDelivery}
            />
          ) : null}
        </Modal>
      ) : null}

      <div className="traderdashboard__header">
        <div className="dashboard__header-box">
          <Logo width="160px" logoColor="#81007F" />

          <div className="header__box">
            <Userbox
              userIcon={<FaUserAlt className="user-icon" />}
              username={showShop ? traderData.username : null}
              downArrow={<FaSortDown className="user-sort" />}
            />
            <button className="logout__btn" onClick={logOutHandler}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="traderdashboard__main">
        <div className={[showSideBar, SideActive].join(" ")}>
          {SideActive ? (
            <span className="spanClear" onClick={removeSideBar}>
              <MdClear />
            </span>
          ) : null}

          <SidebarNav
            icon={<ImHome />}
            navLink="Dashboard"
            notice={() => window.location.reload()}
          />

          <SidebarNav
            icon={<FaUserAlt />}
            navLink="Buyer Profile"
            notice={traderProfileHandler}
          />

          <SidebarNav
            icon={<FaRegBell />}
            navLink="Notifications"
            notice={showNotificationHandler}
          />

          <SidebarNav
            icon={<BiSupport />}
            navLink="Customer Support"
            notice={goToSupporPage}
          />

          <SidebarNav
            icon={<FaTrashAlt />}
            navLink="Delete Account"
            notice={showModalHandler}
          />
        </div>

        {sellerProfile ? (
          <div className="trader-profile">
            <div className="trader-profile-box">
              <div className="seller-prof-info">
                <span>
                  <FaUserAlt />
                </span>
                <h3>Buyer Profile</h3>
              </div>

              <hr />
              <div className="seller-profile-info">
                <div className="seller-prof-box">
                  <span>First Name: </span> <span>{traderData.firstName}</span>{" "}
                  <button onClick={showSellModalHandler}>Edit</button>
                </div>

                <div className="seller-prof-box">
                  <span>Last Name: </span> <span>{traderData.lastName}</span>{" "}
                  <button onClick={showSellModalHandler}>Edit</button>
                </div>

                <div className="seller-prof-box">
                  <span>Username: </span> <span>{traderData.username}</span>{" "}
                  <button onClick={showSellModalHandler}>Edit</button>
                </div>

                <hr />
                <div className="seller-prof-box">
                  <span>Email: </span> <span>{traderData.email}</span>{" "}
                  <button onClick={showSellerEmailModal}>Edit</button>
                </div>

                <div className="seller-prof-box">
                  <span>Password: </span>{" "}
                  <button onClick={showSellerPassModal}>Edit</button>
                </div>

                <div className="seller-prof-box">
                  <span>Phone Number: </span>{" "}
                  <span>{traderData.phoneNumber}</span>{" "}
                  <button onClick={showSellModalHandler}>Edit</button>
                </div>
              </div>

              <div className="close-profile-btn">
                <button onClick={closeSellerProfile}>Close</button>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={["traderdashboard__shopItems", removeShopItem].join(" ")}
        >
          <div className="toggle_icon">
            <div className="toggle__icon--box">
              <div className="toggle__icon-main" onClick={showSideBarHandler}>
                <span>
                  <MdViewHeadline />
                </span>
              </div>
            </div>
          </div>

          <div className="shop__items-box">
            <ShopBox
              shopClass="shop-box shop-box-account"
              shopIcon={<MdOutlineRedeem />}
              shopboxName="Pending Orders"
              ShopBoxValue={showShop ? purchaseArr.length : null}
            />

            <ShopBox
              shopClass="shop-box shop-box-shops"
              shopIcon={<FaShoppingCart />}
              shopboxName="Fav Shops"
              ShopBoxValue={showShop ? "0" : null}
            />

            <ShopBox
              shopClass="shop-box shop-box-account"
              shopIcon={<MdOutlinePendingActions />}
              shopboxName="Order History"
              ShopBoxValue={showShop ? historyBuyer.length : null}
            />
          </div>

          <div className="shop2_activity">
            <div className="transactions-box">
              <DashboardActivity headerValue="Pending Orders">
                {showRecords && purchaseArr.length > 0 ? (
                  purchaseArr.map((purchase) => {
                    return (
                      <div className="pend-box1main" key={purchase._id}>
                        <div className="pending__buyerbox">
                          <div className="pending__circle-1">
                            <div className="pending__circle-2"></div>
                          </div>
                          <p>Pending Order awaiting Delivery</p>
                          <button onClick={() => getOrderDetails(purchase._id)}>
                            view order
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NoRecords
                    Icon={<MdOutlineReceipt />}
                    Message="No Pending Orders"
                  />
                )}

                <div className="loadmore__btns">
                  {pendDeliveryCount > 0 ? (
                    <button
                      className="btn-order-more"
                      onClick={bacToPreviousLoaded}
                    >
                      Back
                    </button>
                  ) : null}

                  {purchaseArr.length >= 5 ? (
                    <button
                      className="btn-order-more load__more"
                      onClick={loadMorePendingOrders}
                    >
                      Load more
                    </button>
                  ) : null}
                </div>
              </DashboardActivity>
            </div>

            <div className="completed-orders">
              <DashboardActivity
                classStatus="completed"
                headerValue="Order History"
              >
                {historyBuyer.length > 0 ? (
                  historyBuyer.map((item, index) => {
                    const timeDate = item.date.split(",");
                    const date = timeDate[0].split("/");
                    const dateIndex = parseInt(date[0]) - 1;
                    return (
                      <div className="pend-box1main" key={item._id}>
                        <div className="pending__buyerbox">
                          <div>
                            <div>
                              <MdOutlineRedeem className="p-box-icon" />
                            </div>
                          </div>
                          <p>
                            Your Order on
                            <span className="dateStyle">{` ${months(
                              dateIndex
                            )} ${date[1]}, ${date[2]}, ${timeDate[1]}`}</span>
                          </p>
                          <button onClick={() => showFullHistrory(item)}>
                            view order
                          </button>
                          <button
                            onClick={() => getReceiptAppHandler(item._id)}
                            className="btn-receip"
                          >
                            Get Receipt
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NoRecords
                    Icon={<MdOutlineReceipt />}
                    Message="No Order History"
                  />
                )}

                <div className="loadmore__btns">
                  {countPurch > 0 ? (
                    <button
                      className="btn-order-more"
                      onClick={backHistoryBuyer}
                    >
                      Back
                    </button>
                  ) : null}

                  {historyBuyer.length >= 5 ? (
                    <button
                      className="btn-order-more load__more"
                      onClick={loadmoreOrderHistory}
                    >
                      Load more
                    </button>
                  ) : null}
                </div>
              </DashboardActivity>
            </div>
          </div>
        </div>
      </div>

      <div className="traderdashboard__footer">
        <p>TImart copyrights reserved 2024 </p>
      </div>
    </div>
  );
};

export default BuyerDashboard;
