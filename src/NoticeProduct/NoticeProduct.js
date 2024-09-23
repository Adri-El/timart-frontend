import React from "react";
import "./NoticeProduct.css";
import { FaTimes } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

const NoticeProduct = (props) => {
  return (
    <div className="modal-content">
      <div className="review__box-navbar">
        <div className="review-box-nav" onClick={props.backToCommentHandler}>
          <MdArrowBackIos className="back_icon" />
          <span>Back</span>
        </div>
        <FaTimes className="close" onClick={props.closeModal} />
      </div>

      <h4>Customer Review</h4>
      {props.children}
    </div>
  );
};

export default NoticeProduct;
