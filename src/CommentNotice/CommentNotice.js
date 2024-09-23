import React from "react";
import "./CommentNotice.css";

const CommentNotice = (props) => {
  "";
  return (
    <div className={props.commentClass} onClick={props.getCommentID}>
      <div className="comment__letter">
        <p>{props.nameLetter}</p>
      </div>
      <div className="comment__name">
        <span className="comment__namespan">
          {props.mainName} reviewed your product
        </span>
      </div>

      <div className="remove__btn">
        {props.isRead === false ? <button>unread</button> : null}
      </div>
    </div>
  );
};

export default CommentNotice;
