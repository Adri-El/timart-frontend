import React from "react";
import "./NoticeProductList.css";

const NoticeProductList = (props) => {
  return (
    <div className="prod-review-box">
      <div className="prod__review-img">
        <img src={props.noticeImg} alt="review-img" />
      </div>

      <div className="prod__review__details">
        <span>{props.noticeProdName}</span>
      </div>

      <div className="customer__review-details">
        <span>
          Customer: <span className="rev__username">@{props.userName}</span>
        </span>
        <span className="review__text">Review: {props.noticeText}</span>
      </div>
    </div>
  );
};

export default NoticeProductList;
