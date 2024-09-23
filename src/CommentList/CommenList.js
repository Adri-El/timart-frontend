import React from "react";
import "./CommentList.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommenList = (props) => {
  return (
    <div className="comment__lists-box">
      <div className="comments__list">
        <div className="name__letter">
          <span>{props.nameLetter}</span>
        </div>

        <div className="main__comment">
          <p className="firstName">{props.name}</p>
          <p>{props.text}</p>
        </div>

        <div className="comment__icon-box">
          <BsThreeDotsVertical
            className="comment__icon"
            onClick={props.getCommentID}
          />
        </div>
      </div>
    </div>
  );
};

export default CommenList;
