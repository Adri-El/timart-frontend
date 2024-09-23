import React, { useState, useEffect } from "react";
import { FaSortDown, FaUserEdit, FaUserAlt, FaTimes } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import {
  MdViewHeadline,
  MdClear,
  MdMarkEmailRead,
  MdOutlineReceipt,
  MdPassword,
} from "react-icons/md";
import { MdOutlineRedeem } from "react-icons/md";
import Userbox from "../../userbox/Userbox";
import SidebarNav from "../../SidebarNav/Sidebarnav";
import ShopBox from "../../ShopBox/Shopbox";
import Logo from "../../Logo/Logo";
import "../../Trader-Dashboard/TraderDashboard";
import DashboardActivity from "../../DashboardActivity/DashboardAcitivity";
import NoRecords from "../../NoRecords/NoRecords";
import { apiUrl, convertPrice, updater } from "../../utilities/utilities";
import Preloader from "../../preloader/Preloader";
import { preloaderActions } from "../../Store/Preloader-Slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton } from "../../Form-Input/FormInput";
import Modal from "../../Modal/Modal";
import Error from "../../Error/Error";
import { errorActions } from "../../Store/Error-Slice";
import { ToastContainer, toast } from "react-toastify";

const LogisticsDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showErr = useSelector((state) => state.error.showError);
  const errMsg = useSelector((state) => state.error.errMsg);
  const [SideActive, setSideActive] = useState("");
  const [showSideBar, setShowSideBar] = useState("traderdashboard__sidebar");
  const [orderArr, setOrderArr] = useState([]);
  const [totalCounts, setTotalCounts] = useState([]);
  const [showCount, setShowCount] = useState(false);
  const [showOrder, setShowOrderArr] = useState(false);
  const showLoader = useSelector((state) => state.loader.loaderShow);
  const [showModal, setShowModal] = useState(false);
  const [showProdDetails, setShowProdDetails] = useState(false);
  const [prodDetails, setProddetails] = useState([]);
  const [ShowtotalShops, setShowtotalShops] = useState(false);
  const [showProdsTotal, setshowProdsTotal] = useState(false);
  const [isupdateMail, setisupdateMail] = useState(false);
  const [showOtpModal, setshowOtpModal] = useState(false);
  const [isupdateUsername, setisupdateUsername] = useState(false);
  const [isupdatePassword, setisupdatePassword] = useState(false);
  const [isRenderLog, setIsRenderLog] = useState(false);
  const [pendCount, setPendCount] = useState(0);
  const entamarketToken = localStorage.getItem("entamarketToken");
  const [checkoutID, setCheckOutID] = useState("");

  const notify = (msg) =>
    toast.error(msg, {
      theme: "colored",
      position: toast.POSITION.TOP_CENTER,
    });

  const getPendingNotifications = () => {
    fetch(`${apiUrl}logistics/get-pending-deliveries?set=${pendCount}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((resp) => {
        if (
          resp.msg === "Unauthorized" ||
          resp.msg === "You are not authorised to perform this task"
        ) {
          localStorage.removeItem("entamarketToken");
          localStorage.removeItem("isAuth");
          navigate("/logisticslogin");
          dispatch(preloaderActions.loaderShowHandler(false));
        } else {
          if (resp.msg === "no more pending deliveries") {
            setShowOrderArr(false);
          } else {
            setShowOrderArr(true);
            setOrderArr(resp.pendingDeliveries);
            dispatch(preloaderActions.loaderShowHandler(false));
          }
        }
      });
  };

  const getCountsHandler = () => {
    fetch(`${apiUrl}logistics/get-counts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (
          resp.msg === "Unauthorized" ||
          resp.msg === "You are not authorised to perform this task"
        ) {
          navigate("/logisticslogin");
          dispatch(preloaderActions.loaderShowHandler(false));
        } else {
          dispatch(preloaderActions.loaderShowHandler(false));
          setShowCount(true);
          setTotalCounts(resp.dataCount);
        }
      });
  };

  useEffect(() => {
    if (entamarketToken) {
      dispatch(preloaderActions.loaderShowHandler(true));
      getPendingNotifications();
      getCountsHandler();
    } else {
      navigate("/logisticslogin");
    }
    // eslint-disable-next-line
  }, [isRenderLog, pendCount]);

  const getFullProdDetails = (id) => {
    setCheckOutID(id);
    dispatch(preloaderActions.loaderShowHandler(true));
    fetch(`${apiUrl}logistics/get-single-pending-delivery?checkoutID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg === "this delivery does not exist") {
          dispatch(preloaderActions.loaderShowHandler(false));
          setShowProdDetails(false);
          notify(resp.msg);
        } else {
          setProddetails(resp.pendingDelivery.purchases);
          setShowProdDetails(true);
          dispatch(preloaderActions.loaderShowHandler(false));
        }
      });
  };

  const closeOrderModal = () => {
    setShowProdDetails(false);
  };

  const closeContentModal = () => {
    setShowModal(false);
    setShowtotalShops(false);
    setshowProdsTotal(false);
    setisupdateMail(false);
    setisupdateUsername(false);
    setisupdatePassword(false);
    dispatch(errorActions.setShowError(false));
  };

  const updateEmailModalHandler = () => {
    setisupdateMail(true);
    setShowModal(true);
  };

  const updateUserNameModal = () => {
    setisupdateUsername(true);
    setShowModal(true);
  };

  const updatePasswordModal = () => {
    setisupdatePassword(true);
    setShowModal(true);
  };

  const logoutAdminHandler = () => {
    localStorage.removeItem("entamarketToken");
    navigate("/logisticslogin");
  };
  const errorHandler = (showerr, errmsg) => {
    dispatch(errorActions.setShowError(showerr));
    dispatch(errorActions.setErrMsg(errmsg));
  };
  const updateEmailHandler = (e) => {
    e.preventDefault();

    const newEmail = e.target.email.value;
    const pass = e.target.pass.value;

    const emailData = {
      email: newEmail,
      password: pass,
    };
    if (newEmail === "") {
      errorHandler(true, "Email is required");
    } else if (pass === "") {
      errorHandler(true, "Password is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      fetch(`${apiUrl}logistics/update-email`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);
          dispatch(preloaderActions.loaderShowHandler(false));
          if (resp.statusCode === 400) {
            dispatch(errorActions.setErrMsg(resp.msg));
            dispatch(errorActions.setShowError(true));
            dispatch(preloaderActions.loaderShowHandler(false));
          } else {
            setshowOtpModal(true);
            setisupdateMail(false);
          }
        });
    }
  };

  const updateUserNameHandler = (e) => {
    e.preventDefault();

    const userName = e.target.username.value;
    const pass = e.target.pass.value;

    const usernameData = {
      username: userName,
      password: pass,
    };
    if (userName === "") {
      errorHandler(true, "Username is Required");
    } else if (pass === "") {
      errorHandler(true, "Password is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      fetch(`${apiUrl}logistics/update-username`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usernameData),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);
          dispatch(preloaderActions.loaderShowHandler(false));
          if (resp.statusCode === 400) {
            dispatch(errorActions.setErrMsg(resp.msg));
            dispatch(errorActions.setShowError(true));
            dispatch(preloaderActions.loaderShowHandler(false));
          } else {
            setshowOtpModal(true);
            setisupdateUsername(false);
          }
        });
    }
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();

    const oldPass = e.target.oldpass.value;
    const newPass = e.target.newpass.value;

    const passwordData = {
      oldPassword: oldPass,
      newPassword: newPass,
    };

    if (oldPass === "") {
      errorHandler(true, "Username is Required");
    } else if (newPass === "") {
      errorHandler(true, "Password is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      fetch(`${apiUrl}logistics/update-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      })
        .then((res) => res.json())
        .then((resp) => {
          updater.TokenUpdaterHandler(resp.entamarketToken);
          dispatch(preloaderActions.loaderShowHandler(false));
          if (resp.statusCode === 400) {
            dispatch(errorActions.setErrMsg(resp.msg));
            dispatch(errorActions.setShowError(true));
            dispatch(preloaderActions.loaderShowHandler(false));
          } else {
            setshowOtpModal(true);
            setisupdatePassword(false);
          }
        });
    }
  };

  const verifyOtpHandler = (e) => {
    e.preventDefault();
    const otpVal = e.target.otp.value;
    const otpData = {
      otp: otpVal,
    };

    if (otpVal === "") {
      errorHandler(true, "OTP is required");
    } else {
      errorHandler(false, "");
      dispatch(preloaderActions.loaderShowHandler(true));
      fetch(`${apiUrl}logistics/verify-update-otp`, {
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
          dispatch(preloaderActions.loaderShowHandler(false));
          if (resp.statusCode === 400) {
            dispatch(errorActions.setErrMsg(resp.msg));
            dispatch(errorActions.setShowError(true));
            dispatch(preloaderActions.loaderShowHandler(false));
          } else {
            setshowOtpModal(false);
            setShowModal(false);
          }
        });
    }
  };

  const showSideBarHandler = () => {
    setSideActive("sideBar__active");
    setShowSideBar("traderdashboard__sidebar");
  };

  const removeSideBar = () => {
    setSideActive("");
  };

  const cofirmDeliveryHandler = (id) => {
    const data = { productID: id, checkoutID: checkoutID };
    setShowModal(true);
    fetch(`${apiUrl}logistics/confirm-product`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resp) => {
        setShowModal(false);
        setShowProdDetails(false);
        setIsRenderLog(!isRenderLog);
      });
  };

  const loadMorePendingCount = () => {
    setPendCount(pendCount + 1);
  };

  const getLessPendingCount = () => {
    if (pendCount === 0) {
      setPendCount(0);
    } else {
      setPendCount(pendCount - 1);
    }
  };

  return (
    <div className="Trader_dashboard">
      {showLoader ? <Preloader /> : null}

      {showModal ? (
        <Modal>
          {ShowtotalShops ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <h3 className="heading-4">Total Number of shops </h3>
              <p className="pshops">{totalCounts.shopsCount} Shops </p>
            </div>
          ) : null}

          {showProdsTotal ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <h3 className="heading-4">Total Products in Shops </h3>
              <p className="pshops">{totalCounts.productsCount} Products </p>
            </div>
          ) : null}

          {isupdateMail ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <form onSubmit={updateEmailHandler}>
                {showErr ? <Error errMsg={errMsg} /> : null}

                <FormInput label="New Email Address" name="email" />
                <FormInput label="Password" name="pass" type="password" />
                <FormButton btnValue="Update Email Address" />
              </form>
            </div>
          ) : null}

          {showOtpModal ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <form onSubmit={verifyOtpHandler}>
                {showErr ? <Error errMsg={errMsg} /> : null}

                <FormInput label="Enter OTP Sent" name="otp" />
                <FormButton btnValue="Verify OTP" />
              </form>
            </div>
          ) : null}

          {isupdateUsername ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <form onSubmit={updateUserNameHandler}>
                {showErr ? <Error errMsg={errMsg} /> : null}

                <FormInput label="New username" name="username" />
                <FormInput label="Password" name="pass" type="password" />
                <FormButton btnValue="Update Username" />
              </form>
            </div>
          ) : null}

          {isupdatePassword ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <form onSubmit={updatePasswordHandler}>
                {showErr ? <Error errMsg={errMsg} /> : null}

                <FormInput
                  label="Old Password"
                  name="oldpass"
                  type="password"
                />
                <FormInput
                  label="New Password"
                  name="newpass"
                  type="password"
                />
                <FormButton btnValue="Update Password" />
              </form>
            </div>
          ) : null}
        </Modal>
      ) : null}

      {showProdDetails ? (
        <div className="order__prodmodal">
          <div className="order__modal-content">
            <div className="close__modal">
              <FaTimes className="close__icon" onClick={closeOrderModal} />
            </div>
            <h3 className="pending-header pend1h2Text">
              Pending Order Details
            </h3>
            {prodDetails.map((orderData) => {
              console.log(orderData);
              if (orderData.trackingStatus !== "logistics") {
                return (
                  <div key={orderData.product._id} className="orderBox2">
                    <div className="order__main-box">
                      <div className="order__img-box">
                        <img
                          src={orderData.product.images[0]}
                          alt="order-img"
                        />
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
                    <h3 className="pending-header headerPend2">
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

                    <p></p>

                    <div className="acct__details-box">
                      <div>
                        <p className="notePBox">
                          Note: Click the Button below when this Product have
                          been Picked up from the Seller
                        </p>
                      </div>

                      <div className="btnPayBox1">
                        <button
                          className="btn-pay"
                          onClick={() =>
                            cofirmDeliveryHandler(orderData.product._id)
                          }
                        >
                          Confirm Pick Up
                        </button>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return false;
              }
            })}
          </div>
        </div>
      ) : null}

      <div className="traderdashboard__header">
        <div className="dashboard__header-box">
          <Logo width="160px" logoColor="#81007F" />

          <div className="header__box">
            <Userbox
              userIcon={<FaUserAlt className="user-icon" />}
              username={"Hi Logistics"}
              downArrow={<FaSortDown className="user-sort" />}
            />
            <button className="logout__btn" onClick={logoutAdminHandler}>
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
            navLink="Home"
            notice={() => window.location.reload()}
          />

          <SidebarNav
            icon={<MdMarkEmailRead />}
            navLink="Update Email"
            notice={updateEmailModalHandler}
          />

          <SidebarNav
            icon={<FaUserEdit />}
            navLink="Update Username"
            notice={updateUserNameModal}
          />
          <SidebarNav
            icon={<MdPassword />}
            navLink="Update Password"
            notice={updatePasswordModal}
          />
        </div>

        <div className="traderdashboard__shopItems">
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
              ShopBoxValue={showCount ? totalCounts.pendingDeliveryCount : 0}
            />
          </div>

          <div className="shop__activity">
            <div className="transactions-box">
              <DashboardActivity headerValue="Pending Orders">
                {showOrder && orderArr.length > 0 ? (
                  orderArr.map((order) => {
                    return (
                      <div className="pending__buyer" key={order._id}>
                        <div className="pending__buyerbox">
                          <div className="pending__circle-1">
                            <div className="pending__circle-2"></div>
                          </div>
                          <p>Pending order awaiting Pick up</p>
                          <button onClick={() => getFullProdDetails(order._id)}>
                            view order
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NoRecords
                    Icon={<MdOutlineReceipt />}
                    Message="No Pending orders"
                  />
                )}

                {orderArr.length > 0 ? (
                  <div className="loadmore__btns">
                    {pendCount > 0 ? (
                      <button
                        className="btn-order-more"
                        onClick={getLessPendingCount}
                      >
                        Back
                      </button>
                    ) : null}

                    <button
                      className="btn-order-more load__more"
                      onClick={loadMorePendingCount}
                    >
                      Get more
                    </button>
                  </div>
                ) : null}
              </DashboardActivity>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

      <div className="traderdashboard__footer">
        <p>TImart Limited Trader Dashboard</p>
        <p>All rights reserved 2024</p>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
