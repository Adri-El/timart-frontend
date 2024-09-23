import React, { useState, useEffect } from "react";
import { FaSortDown, FaUserEdit, FaUserAlt, FaTimes } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import {
  MdViewHeadline,
  MdClear,
  MdMarkEmailRead,
  MdOutlineReceipt,
  MdPassword,
  MdOutlinePendingActions,
  MdContactSupport,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineRedeem } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
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

const AdminDashboard = () => {
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
  const [isRequest, setIsRequest] = useState(false);
  const [requestArr, setRequestArr] = useState([]);
  const [payAccountArr, setPayAcctArr] = useState([]);
  const [showPayAcct, setShowPayAcct] = useState(false);
  const [payId, setPayID] = useState("");
  const [isrender, setisrender] = useState(true);
  const [isIssues, setIssues] = useState(false);
  const [issuesArr, setIssuesArr] = useState([]);
  const [singleIssue, setsingleIssue] = useState(false);
  const [singleIssueObj, setsingleIssueObj] = useState({});
  const [issueId, setIssueId] = useState("");
  const [issueCount, setIssueCount] = useState(0);
  const [noMoreIssues, setNoMoreIssues] = useState(false);
  const [withdrawalCount, setWithDrawalCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [showFull, setShowFull] = useState(true);
  const [showSellers, setShowSellers] = useState(false);
  const [docsFolder, setDocsFolder] = useState([]);
  const [showImgModal, setshowImgModal] = useState(false);
  const [imgModal, setImgModal] = useState("");

  const entamarketToken = localStorage.getItem("entamarketToken");
  const notify = (msg) =>
    toast.error(msg, {
      theme: "colored",
      position: toast.POSITION.TOP_CENTER,
    });

  //pending deliveries api
  const getPendingNotifications = () => {
    fetch(`${apiUrl}admin/get-pending-deliveries?set=${pendingCount}`, {
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
          navigate("/adminlogin");
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

  //Sellers Verification api
  const getSellersVerification = () => {
    fetch(`${apiUrl}admin/view-trader-verification-docs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((resp) => {
        if (resp.statusCode === 200) {
          setDocsFolder(resp.unverifiedTraderDocs);
        }
        console.log(resp);
      });
  };

  //withdrawals api
  const getPendingWithDrawals = () => {
    fetch(`${apiUrl}admin/get-pending-withdrawals?set=${withdrawalCount}`, {
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
          navigate("/adminlogin");
          dispatch(preloaderActions.loaderShowHandler(false));
        } else {
          if (resp.msg !== "no more pending withdrawals") {
            dispatch(preloaderActions.loaderShowHandler(false));
            setIsRequest(true);
            setRequestArr(resp.pendingWithdrawals);
          } else {
            setIsRequest(false);
            dispatch(preloaderActions.loaderShowHandler(false));
          }
        }
      });
  };

  //Get counts api
  const getCountsHandler = () => {
    fetch(`${apiUrl}admin/get-counts`, {
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
          navigate("/adminlogin");
          dispatch(preloaderActions.loaderShowHandler(false));
        } else {
          dispatch(preloaderActions.loaderShowHandler(false));
          setShowCount(true);
          setTotalCounts(resp.dataCount);
        }
      });
  };

  //customer get all api
  const getSupportIssues = () => {
    fetch(`${apiUrl}customer-support/get-all?set=${issueCount}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg === "no more pending withdrawals") {
          console.log("no pending issues");
          setNoMoreIssues(true);
        } else {
          setIssuesArr(resp.csDocuments);
        }
      });
  };

  useEffect(() => {
    if (entamarketToken) {
      dispatch(preloaderActions.loaderShowHandler(true));
      getPendingNotifications();
      getCountsHandler();
      getPendingWithDrawals();
      getSupportIssues();
      getSellersVerification();
    } else {
      navigate("/adminlogin");
    }
    // eslint-disable-next-line
  }, [isrender, withdrawalCount, pendingCount]);

  //get full prod details
  const getFullProdDetails = (id) => {
    dispatch(preloaderActions.loaderShowHandler(true));
    fetch(`${apiUrl}admin/get-single-pending-delivery?checkoutID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg === "this delivery does not exist") {
          notify(resp.msg);
          dispatch(preloaderActions.loaderShowHandler(false));
          setShowProdDetails(false);
        } else {
          setShowProdDetails(true);
          setProddetails(resp.pendingDelivery.purchases);
          dispatch(preloaderActions.loaderShowHandler(false));
        }
      });
  };

  const closeOrderModal = () => {
    setShowProdDetails(false);
    setShowPayAcct(false);
    setIssues(false);
    setsingleIssue(false);
  };

  const closeContentModal = () => {
    setShowModal(false);
    setShowtotalShops(false);
    setshowProdsTotal(false);
    setisupdateMail(false);
    setisupdateUsername(false);
    setisupdatePassword(false);
    dispatch(errorActions.setShowError(false));
    setIssues(false);
    setshowImgModal(false);
  };

  const showTotalShops = () => {
    setShowModal(true);
    setShowtotalShops(true);
  };

  const showProdsTot = () => {
    setShowModal(true);
    setshowProdsTotal(true);
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
    navigate("/adminlogin");
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
      fetch(`${apiUrl}admin/update-email`, {
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
      fetch(`${apiUrl}admin/update-username`, {
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
      fetch(`${apiUrl}admin/update-password`, {
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
      fetch(`${apiUrl}admin/verify-update-otp`, {
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

  const viewRequestHandler = (id) => {
    setPayID(id);
    dispatch(preloaderActions.loaderShowHandler(true));
    fetch(`${apiUrl}admin/view-notification?notificationID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.statusCode === 400) {
          dispatch(errorActions.setErrMsg(resp.msg));
          dispatch(errorActions.setShowError(true));
          dispatch(preloaderActions.loaderShowHandler(false));
        } else {
          if (resp.notification.length <= 0) {
            dispatch(preloaderActions.loaderShowHandler(false));
            setPayAcctArr(resp.notification);
            setShowPayAcct(false);
            notify("Invalid Payment Request");
          } else {
            setshowOtpModal(false);
            setShowModal(false);
            setPayAcctArr(resp.notification);
            setShowPayAcct(true);
            dispatch(preloaderActions.loaderShowHandler(false));
          }
        }
      });
  };

  const confirmPaymentHandler = () => {
    fetch(`${apiUrl}admin/confirm-withdrawal?pendingWithdrawalID=${payId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setisrender(!isrender);
        setShowPayAcct(false);
      });
  };

  const showIssuesHandler = () => {
    setIssues(true);
  };

  const openIssueHandler = (id) => {
    setIssues(false);
    setIssueId(id);
    dispatch(preloaderActions.loaderShowHandler(true));

    fetch(`${apiUrl}customer-support/get-one?csID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setsingleIssue(true);
        setsingleIssueObj(resp.csData);
        dispatch(preloaderActions.loaderShowHandler(false));
      });
  };

  const goBackToIssues = () => {
    setIssues(true);
    setsingleIssue(false);
  };

  const closeDeleteIssue = () => {
    dispatch(preloaderActions.loaderShowHandler(true));
    fetch(`${apiUrl}customer-support/close?csID=${issueId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setsingleIssue(false);
        setIssues(true);
        setisrender(!isrender);
        dispatch(preloaderActions.loaderShowHandler(false));
      });
  };

  const loadMoreHandler = () => {
    setIssueCount(issueCount + 1);
    setisrender(!isrender);
  };
  const gobackMoreHandler = () => {
    setNoMoreIssues(false);
    if (issueCount === 0) {
      setIssueCount(0);
      setisrender(!isrender);
    } else {
      setIssueCount(issueCount - 1);
      setisrender(!isrender);
    }
  };

  const loadMorePendingOrders = () => {
    setWithDrawalCount(withdrawalCount + 1);
  };
  const bacToPreviousLoaded = () => {
    if (withdrawalCount === 0) {
      setWithDrawalCount(0);
    } else {
      setWithDrawalCount(withdrawalCount - 1);
    }
  };

  const getMorePendingOrder = () => {
    setPendingCount(pendingCount + 1);
  };
  const getLessPendingOrder = () => {
    if (pendingCount === 0) {
      setPendingCount(0);
    } else {
      setPendingCount(pendingCount - 1);
    }
  };

  const openVerfySellers = () => {
    setShowFull(false);
    setShowSellers(true);
  };

  const goBackToHome = () => {
    setShowFull(true);
    setShowSellers(false);
  };

  const handleValidateSeller = (id, isvalid) => {
    const info = {
      id: id,
      approved: isvalid,
    };

    dispatch(preloaderActions.loaderShowHandler(true));
    fetch(`${apiUrl}admin/trader-verification-docs-verdict`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((resp) => {
        setisrender(!isrender);
      });
  };

  const handleShowId = (imgUrl, fName, lName, email, phone) => {
    setShowtotalShops(false);
    setshowProdsTotal(false);
    setisupdateMail(false);
    setisupdateUsername(false);
    setisupdatePassword(false);
    dispatch(errorActions.setShowError(false));
    setIssues(false);
    setshowImgModal(true);
    setShowModal(true);
    setImgModal({
      img: imgUrl,
      fname: fName,
      lname: lName,
      email: email,
      phone: phone,
    });
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

          {showImgModal ? (
            <div className="modal-content">
              <div className="close__modal">
                <FaTimes className="close__icon" onClick={closeContentModal} />
              </div>

              <div className="contain-sellinfo">
                <img src={imgModal.img} alt="img-modal" width="400px" />
              </div>

              <div className="contain-sellinfo">
                <h4>First Name: {imgModal.fname}</h4>
              </div>
              <div className="contain-sellinfo">
                <h4>Last Name: {imgModal.lname}</h4>
              </div>
              <div className="contain-sellinfo">
                <h4>Email: {imgModal.email}</h4>
              </div>
              <div className="contain-sellinfo">
                <h4>Phone: {imgModal.phone}</h4>
              </div>
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
            <h3 className="pending-header">Pending Order Details</h3>
            {prodDetails.map((orderData) => {
              return (
                <div key={orderData.product._id}>
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
                  <h3 className="pending-header">Product Seller Details</h3>

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
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {showPayAcct ? (
        <div className="order__prodmodal">
          <div className="order__modal-content">
            <div className="close__modal">
              <FaTimes className="close__icon" onClick={closeOrderModal} />
            </div>

            {payAccountArr.map((payRequest) => {
              return (
                <div key={payRequest._id} className="main__div">
                  <div className="order__prodinfo">
                    <h4>Bank Details for Payment</h4>
                    <p>Account Name: {payRequest.bankDetails.accountName}</p>
                    <p>
                      Account Number: {payRequest.bankDetails.accountNumber}
                    </p>
                    <p>Bank Name: {payRequest.bankDetails.bankName}</p>
                    <p>Withdrawal Amount: {convertPrice(payRequest.amount)}</p>
                  </div>

                  <h4>Trader Information</h4>

                  <p>
                    Full Name:{" "}
                    {payRequest.from.firstName + " " + payRequest.from.lastName}
                  </p>
                  <p>Phone Number: {payRequest.from.phoneNumber}</p>
                  <p>Username: {payRequest.from.username}</p>

                  <div className="acct__details-box">
                    <p>
                      Note: Click the button below after payment have been made
                      to confirm Payment
                    </p>
                    <button className="btn-pay" onClick={confirmPaymentHandler}>
                      Confirm Payment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {isIssues ? (
        <div className="order__prodmodal">
          <div className="order__modal-content">
            <div className="close__modal">
              <FaTimes className="close__icon" onClick={closeOrderModal} />
            </div>

            <h3>Customer Issues</h3>

            {issuesArr.map((issue) => {
              return (
                <div className="issues__box" key={issue._id}>
                  <div className="pending__circle-1">
                    <div className="pending__circle-2"></div>
                  </div>

                  <div className="issues__details">
                    <p>Customer support from @{issue.fullName}</p>
                  </div>
                  <button onClick={() => openIssueHandler(issue._id)}>
                    Open issue
                  </button>
                </div>
              );
            })}

            <div className="acct__details-box">
              {issueCount >= 1 ? (
                <button className="btn-pay" onClick={gobackMoreHandler}>
                  Back
                </button>
              ) : null}
              <button className="btn-pay" onClick={loadMoreHandler}>
                Load more issues
              </button>
            </div>

            {noMoreIssues ? (
              <div className="nomore__issues">
                <span>No more issues to load</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {singleIssue ? (
        <div className="order__prodmodal">
          <div className="order__modal-content">
            <div className="back__btn-box">
              <span onClick={goBackToIssues}>Back</span>
            </div>
            <div className="close__modal">
              <FaTimes className="close__icon" onClick={closeOrderModal} />
            </div>

            <h3>Customer Issue from {singleIssueObj.fullName} </h3>

            <div className="box__issue">
              <p>Full Name: {singleIssueObj.fullName}</p>
              <p>Email: {singleIssueObj.email}</p>
              <p>Message: {singleIssueObj.message}</p>
            </div>

            <div className="acct__details-box">
              <p>
                Note: Click the button below after an issue have been solved
              </p>
              <button className="btn-pay" onClick={closeDeleteIssue}>
                Issue Solved
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="traderdashboard__header">
        <div className="dashboard__header-box">
          <Logo width="160px" logoColor="#81007F" />

          <div className="header__box">
            <Userbox
              userIcon={<FaUserAlt className="user-icon" />}
              username={"Hi admin"}
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
            icon={<HiUsers />}
            navLink="Total Products"
            notice={showProdsTot}
          />

          <SidebarNav
            icon={<HiUsers />}
            navLink="Total Shops"
            notice={showTotalShops}
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
          <SidebarNav
            icon={<MdContactSupport />}
            navLink="Customer Issues"
            notice={showIssuesHandler}
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

          {showFull ? (
            <>
              <div className="shop__items-box">
                <ShopBox
                  shopClass="shop-box shop-box-account"
                  shopIcon={<HiUsers />}
                  shopboxName="Total Sellers"
                  ShopBoxValue={showCount ? totalCounts.tradersCount : 0}
                />

                <ShopBox
                  shopClass="shop-box shop-box-shops"
                  shopIcon={<RiAdminFill />}
                  shopboxName="Total Buyers"
                  ShopBoxValue={showCount ? totalCounts.buyersCount : 0}
                />

                <ShopBox
                  shopClass="shop-box shop-box-account"
                  shopIcon={<MdOutlineRedeem />}
                  shopboxName="Pending Orders"
                  ShopBoxValue={
                    showCount ? totalCounts.pendingDeliveryCount : 0
                  }
                />

                <ShopBox
                  shopClass="shop-box shop-box-shops"
                  shopIcon={<RiAdminFill />}
                  shopboxName="Total Users "
                  ShopBoxValue={showCount ? totalCounts.usersCount : 0}
                />

                <ShopBox
                  shopClass="shop-box shop-box-account"
                  shopIcon={<RiAdminFill />}
                  shopboxName="Verify Sellers"
                  ShopBoxValue={showCount ? docsFolder.length : 0}
                  openShop={openVerfySellers}
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
                              <p>Pending order awaiting delivery</p>
                              <button
                                onClick={() => getFullProdDetails(order._id)}
                              >
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
                        {pendingCount > 0 ? (
                          <button
                            className="btn-order-more"
                            onClick={getLessPendingOrder}
                          >
                            Back
                          </button>
                        ) : null}

                        <button
                          className="btn-order-more load__more"
                          onClick={getMorePendingOrder}
                        >
                          Get more
                        </button>
                      </div>
                    ) : null}
                  </DashboardActivity>
                </div>

                <div className="completed-orders">
                  <DashboardActivity
                    classStatus="completed"
                    headerValue="Payment Requests"
                  >
                    {isRequest && requestArr.length > 0 ? (
                      requestArr.map((request) => {
                        return (
                          <div className="pending__buyer" key={request._id}>
                            <div className="pending__buyerbox">
                              <div className="success__circle-1">
                                <div className="success__circle-2"></div>
                              </div>
                              <p>
                                Payment request from{" "}
                                {`${request.trader.firstName} ${request.trader.lastName}`}
                              </p>
                              <button
                                onClick={() => viewRequestHandler(request._id)}
                              >
                                View request
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoRecords
                        Icon={<MdOutlinePendingActions />}
                        Message="No Payment Requests "
                      />
                    )}

                    {requestArr.length > 0 ? (
                      <div className="loadmore__btns">
                        {withdrawalCount > 0 ? (
                          <button
                            className="btn-order-more"
                            onClick={bacToPreviousLoaded}
                          >
                            Back
                          </button>
                        ) : null}

                        <button
                          className="btn-order-more load__more"
                          onClick={loadMorePendingOrders}
                        >
                          Get more
                        </button>
                      </div>
                    ) : null}
                  </DashboardActivity>
                </div>
              </div>
            </>
          ) : null}

          {showSellers ? (
            <div className="sell-box">
              <div className="sell-box-btn">
                <button onClick={goBackToHome}>Back</button>
              </div>

              {docsFolder.length > 0 ? (
                <div className="sell-header">
                  <h1>Sellers Verification</h1>
                </div>
              ) : null}

              <div className="sell-box1">
                {docsFolder.length > 0 ? (
                  docsFolder.map((value, index) => {
                    return (
                      <div className="sell-mainbox" key={value._id}>
                        <div>
                          <span>{index + 1}</span>
                        </div>

                        <div>
                          <span>
                            {`${value.traderData.firstName} ${value.traderData.lastName}`}
                          </span>
                        </div>

                        <div>
                          <span>{`${value.traderData.email}`}</span>
                        </div>

                        <div>
                          <span>{`${value.traderData.phoneNumber}`}</span>
                        </div>

                        <div className="sell-imgBox">
                          <img
                            src={value.idCard}
                            alt="card"
                            onClick={() =>
                              handleShowId(
                                value.idCard,
                                value.traderData.firstName,
                                value.traderData.lastName,
                                value.traderData.email,
                                value.traderData.phoneNumber
                              )
                            }
                          />
                          <img
                            src={value.utilityBill}
                            alt="utility"
                            onClick={() =>
                              handleShowId(
                                value.utilityBill,
                                value.traderData.firstName,
                                value.traderData.lastName,
                                value.traderData.email,
                                value.traderData.phoneNumber
                              )
                            }
                          />
                        </div>

                        <div>
                          <button
                            onClick={() =>
                              handleValidateSeller(value._id, true)
                            }
                            className="sell-validate-btn"
                          >
                            Validate
                          </button>

                          <button
                            onClick={() =>
                              handleValidateSeller(value._id, false)
                            }
                            className="sell-decline-btn"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="main-errbox">
                    <h4>No Verification Request, Found</h4>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ToastContainer autoClose={1000} />
      <div className="traderdashboard__footer">
        <p>Entamarket Limited Trader Dashboard</p>
        <p>All rights reserved 2022</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
