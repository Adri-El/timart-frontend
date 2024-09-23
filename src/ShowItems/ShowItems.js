import React from "react";
import { convertPrice } from "../utilities/utilities";
import "./ShowItems.css";

const ShowItems = (props) => {
  return (
    <div>
      <div className="show-itemsbox" onClick={props.closeShowItems}></div>
      <div className="show-itemsbox-content">
        <div className="backbtn-box">
          <button onClick={props.closeShowItems}>Back</button>
        </div>

        <div className="main-contentmain">
          <h2 className="view-h2">View Order History</h2>

          {props.fullHistory.products.map((item, index) => {
            return (
              <div className="contentmain1" key={item.product._id}>
                <div className="mainImgCon">
                  <img src={item.product.images[0]} alt="item-img" />
                </div>
                <div className="content-type">
                  <p className="prodType">Product Name</p>
                  <p className="prodName-1">{item.product.name}</p>
                </div>

                <div className="content-type">
                  <p className="prodType">Product Price</p>
                  <p className="prodName-1">
                    {convertPrice(item.product.price)}
                  </p>
                </div>

                <div className="content-type">
                  <p className="prodType">Quantity</p>
                  <p className="prodName-1">{item.quantity}</p>
                </div>

                <div className="content-type">
                  <p className="prodType">Sold By</p>
                  <p className="prodName-1">{item.shop.name}</p>
                </div>
                <div className="content-type">
                  <p className="prodType">Seller Address</p>
                  <p className="prodName-1">{item.shop.shopAddress}</p>
                </div>
              </div>
            );
          })}

          <div className="contentmain1">
            <h2 className="view-h2">Transaction Summary</h2>

            <div className="content-type">
              <p className="prodType">Date</p>
              <p className="prodName-1">{props.fullHistory.date}</p>
            </div>

            <div className="content-type">
              <p className="prodType">Delivered to</p>
              <p className="prodName-1">{`${props.fullHistory.buyer.firstName} ${props.fullHistory.buyer.lastName}`}</p>
            </div>

            <div className="content-type">
              <p className="prodType">Delivery Address</p>
              <p className="prodName-1">
                {props.fullHistory.buyer.deliveryAddress}
              </p>
            </div>

            <div className="content-type">
              <p className="prodType">Logistics Fee</p>
              <p className="prodName-1">
                {convertPrice(props.fullHistory.logisticsFee)} (
                {props.fullHistory.buyer.location})
              </p>
            </div>

            <div className="content-type">
              <p className="prodType">Transaction Fee</p>
              <p className="prodName-1">
                {convertPrice(props.fullHistory.paymentGatewayFee)}
              </p>
            </div>

            <div className="content-type">
              <p className="prodType">Total Price</p>
              <p className="prodName-1">
                {convertPrice(props.fullHistory.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItems;
