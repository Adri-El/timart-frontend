import React, { useRef, useState, useEffect } from "react";
import "./SellerVerification.css";
import Logo from "../Logo/Logo";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utilities/utilities";
import Preloader from "../preloader/Preloader";

const SellerVerification = () => {
  const navigate = useNavigate();
  const entamarketToken = localStorage.getItem("entamarketToken");

  useEffect(() => {
    if (!entamarketToken) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const idCardInput = useRef();
  const shopUtilInput = useRef();
  const [cardImgs, setCardImgs] = useState([]);
  const [utilImgs, setUtilImgs] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const notify = (msg) =>
    toast.error(msg, {
      autoClose: 30000,
    });
  const success = (msg) =>
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 30000,
    });

  const handleUploadForms = (e) => {
    e.preventDefault();
    const idCard = idCardInput.current.files;
    const utilityInput = shopUtilInput.current.files;

    if (idCard.length === 0) {
      notify("ID Card required");
    } else if (utilityInput.length === 0) {
      notify("Utility bill required");
    } else {
      const formData = new FormData();
      for (let img of idCard) {
        formData.append("idCard", img);
      }
      for (let img2 of utilityInput) {
        formData.append("utilityBill", img2);
      }

      setIsLoading(true);
      fetch(`${apiUrl}trader/upload-verification-docs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setIsLoading(false);
          if (data.statusCode === 200 || data.statusCode === 201) {
            idCardInput.current.value = "";
            shopUtilInput.current.value = "";
            setCardImgs([]);
            setUtilImgs([]);
            if (data.msg === "success") {
              success(data.msg);
              setTimeout(() => {
                navigate("/traderdashboard");
              }, 2000);
            } else {
              notify(data.msg);
            }
          } else {
            notify("Something went wrong");
          }
        });
    }
  };

  const handleShowFiles1 = () => {
    const idCard = idCardInput.current.files;
    let imgs = [];
    for (let idValue of idCard) {
      let imageUrl = URL.createObjectURL(idValue);
      imgs.push(imageUrl);
      setCardImgs(imgs);
    }
  };

  const handleShowFiles2 = () => {
    const utilImg = shopUtilInput.current.files;
    let imgs = [];
    for (let img of utilImg) {
      let imageUrl = URL.createObjectURL(img);
      imgs.push(imageUrl);
      setUtilImgs(imgs);
    }
  };

  return (
    <div className="mainb">
      <div className="veribox">
        <Logo width="160px" logoColor="#81007F" />
      </div>
      <div className="seller-vBody">
        <div className="verify-box">
          <h2>Account Verification</h2>
        </div>

        <div className="verify-formBox">
          <p className="vbox-p1">
            Please fill in the from below to continue with your Account
            verification, you are required to Upload any of the following
            documents.
          </p>

          <div className="vboxicons">
            <div className="vbox-icon">
              <FaRegCheckCircle className="iconv2" />
              <span>
                Government issued ID Card (NIN/Voter's Card/Driver's License)
              </span>
            </div>
            <div className="vbox-icon">
              <FaRegCheckCircle className="iconv2" />
              <span>
                Shop Utility Bills Document (Electricity Bill/Water Bills/Shop
                Rent Receipt)
              </span>
            </div>
          </div>

          <form onSubmit={handleUploadForms}>
            <div className="form-verifymain">
              <label>
                Upload Government issued ID Card (Should be JPEG, JPG, PNG)
              </label>
              <input
                type="file"
                hidden
                ref={idCardInput}
                onChange={handleShowFiles1}
              />

              <div className="flex-imagebox">
                <div
                  className="choose-box"
                  onClick={() => idCardInput.current.click()}
                >
                  <IoCameraOutline className="choose-icon" />
                  <span>Choose Files</span>
                </div>

                <div className="flex-imagebox2">
                  {cardImgs.length > 0
                    ? cardImgs.map((data, index) => {
                        return (
                          <img
                            src={data}
                            key={data}
                            alt="Imgs"
                            className="card-img"
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>

            <div className="form-verifymain">
              <label>
                Upload Shop Utility Bills (Should be JPEG, JPG, PNG)
              </label>
              <input
                type="file"
                hidden
                ref={shopUtilInput}
                onChange={handleShowFiles2}
              />

              <div className="flex-imagebox">
                <div
                  className="choose-box"
                  onClick={() => shopUtilInput.current.click()}
                >
                  <IoCameraOutline className="choose-icon" />
                  <span>Choose Files</span>
                </div>

                <div className="flex-imagebox2">
                  {utilImgs.length > 0
                    ? utilImgs.map((data, index) => {
                        return (
                          <img
                            src={data}
                            key={data}
                            alt="Imgs"
                            className="card-img"
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>

            <div className="verify-btnbox">
              <button>Submit Request</button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer autoClose={600} />
      {isloading ? <Preloader /> : null}
    </div>
  );
};

export default SellerVerification;
