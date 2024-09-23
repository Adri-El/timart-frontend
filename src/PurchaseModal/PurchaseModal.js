import React from "react";
import "./PurchaseModal.css";
import { convertPrice } from "../utilities/utilities";

export const PurchaseModal = (props) => {
  const totalPrice =
    parseInt(props.info.product.price) * parseInt(props.info.quantity);
  return (
    <>
      <div className="purchase-modal" onClick={props.close}></div>
      <div className="purchase-content">
        <h2 className="purchase-header">{props.typeName}</h2>

        {props.type === "Seller" ? (
          <div className="purchase-item item-img">
            <img src={props.info.product.images[0]} alt="purchase-img1" />
          </div>
        ) : null}

        {props.type !== "Seller" ? (
          <div className="purchase-item">
            <p className="type-item">Buyer's Name</p>
            <p className="item-main">{props.fullName}</p>
          </div>
        ) : null}

        <div className="purchase-item">
          <p className="type-item">Product Name</p>
          <p className="item-main">{props.info.product.name}</p>
        </div>

        <div className="purchase-item">
          <p className="type-item">Product Price</p>
          <p className="item-main">{convertPrice(props.info.product.price)}</p>
        </div>

        <div className="purchase-item">
          <p className="type-item">Quantity</p>
          <p className="item-main">{props.info.quantity}</p>
        </div>

        <div className="purchase-item">
          <p className="type-item">Total Price</p>
          <p className="item-main">{convertPrice(totalPrice)}</p>
        </div>
        <div className="purchase-item">
          <p className="type-item">Date/time</p>
          <p className="item-main">{props.info.soldAt}</p>
        </div>

        {props.type !== "Seller" ? (
          <div className="purchase-btn-box">
            <button onClick={props.getReceiptAppHandler}>Get Receipt</button>
          </div>
        ) : null}
      </div>
    </>
  );
};
