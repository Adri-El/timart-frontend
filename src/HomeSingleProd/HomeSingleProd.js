import React, { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

const HomeSingleProd = (props) => {
  const [imgCount, setImgCount] = useState(0);
  const [isZoom, setisZoom] = useState(false);
  const [zoomUrl] = useState(props.imgUrl);
  const [zoomCount, setZoomCount] = useState(0);

  const changeProductImage = () => {
    if (imgCount !== props.imgUrl.length - 1) {
      setImgCount(imgCount + 1);
    } else {
      setImgCount(0);
    }
  };

  const reduceProductImage = () => {
    if (imgCount > 0) {
      setImgCount(imgCount - 1);
    }
  };
  const closeZoomModal = () => {
    setisZoom(false);
  };
  const showZoomModal = () => {
    setisZoom(true);
  };

  const chooseImg = (index) => {
    setZoomCount(index);
  };

  return (
    <div className="product-main-box">
      <div className="product_single-img-box">
        <button className="icon__arrow" onClick={reduceProductImage}>
          <MdArrowBackIos />
        </button>

        <div className="prod__image-box" onClick={showZoomModal}>
          <img src={props.imgUrl[imgCount]} alt="product-img" />
        </div>

        <button className="icon__arrow" onClick={changeProductImage}>
          <MdArrowForwardIos />
        </button>
      </div>

      <div className="product-single-details">
        <div className="shop__box-b">
          <span className="shop-name">{props.shopName}</span>
        </div>

        <h3 className="prodname">{props.prodName}</h3>

        <div className="phone p-span phone__box">
          <GoLocation className="shop__location" />
          <span className="shop-name">{props.address}</span>
        </div>
        <div className="phone p-span phone__box">
          <FiPhone className="phone__icon" />
          <a href={`tel:${props.phone}`}>{props.phone}</a>
        </div>
        <div className="product-status p-span span2-weight">
          <span>
            <b>Stock Quantity:</b>{" "}
          </span>{" "}
          <span>{props.prodQuantity}</span>
        </div>

        {props.prodWeight !== null ? (
          <div className="product-status p-span span2-weight">
            <span>
              <b>Weight: </b>
            </span>{" "}
            <span> {props.prodWeight}Kg</span>
          </div>
        ) : null}
        <div className="product-desc p-span">
          <span>{props.prodDesc}</span>
        </div>
        <div className="product-price">
          <h3>{props.price}</h3>
        </div>
        <div className="produc-addcart">
          <button onClick={props.addProductToCart}>
            {" "}
            <span>
              <RiShoppingCart2Line />
            </span>{" "}
            Add to Cart
          </button>
        </div>
      </div>

      {isZoom ? (
        <>
          <div className="zoom_imgModal" onClick={closeZoomModal}></div>
          <div className="zoom_imgContent">
            <img
              src={zoomUrl[zoomCount]}
              alt="product-img"
              className="zoom-img"
            />

            <div className="img-selectbox">
              <div className="box-img1">
                {props.imgUrl.map((url, index) => {
                  return (
                    <img
                      src={url}
                      key={index}
                      alt="zoom"
                      onClick={() => chooseImg(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HomeSingleProd;
