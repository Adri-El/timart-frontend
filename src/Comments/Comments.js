import React, { useEffect, useState, useRef } from "react";
import { updater, apiUrl } from "../utilities/utilities";
import CommenList from "../CommentList/CommenList";
import { commentActions } from "../Store/Comment -Slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { FaTimes } from "react-icons/fa";
import { preloaderActions } from "../Store/Preloader-Slice";
import Error from "../Error/Error";
import { useNavigate } from "react-router-dom";
import "./Comments.css";

const Comments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDelete = useSelector((state) => state.comment.showDelete);
  const isRenderComment = useSelector((state) => state.comment.isRenderComment);
  const [commentID, setCommentID] = useState("");
  const [commentText, setCommentText] = useState("");
  const [value, setSetValue] = useState(0);
  const [comments, setComments] = useState([]);
  const [showComment, setshowComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const prodID = localStorage.getItem("prodID");
  const entamarketToken = localStorage.getItem("entamarketToken");
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const commentRef = useRef();

  useEffect(() => {
    fetch(`${apiUrl}comment/get-comments?productID=${prodID}&set=${value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.msg !== "no more comments" && resp.msg !== "Unauthorized") {
          setComments(resp.comments);
          setshowComment(true);
        }
      });
  }, [isRenderComment]);

  const addCommentsHandler = (event) => {
    event.preventDefault();
    const text = event.target.comment.value;
    const commentValue = {
      text: text,
      productID: prodID,
    };

    if (text === "") {
      setErrMsg("Text is required");
      setShowErr(true);
    } else {
      fetch(`${apiUrl}comment/add-comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${entamarketToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentValue),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (
            resp.msg === "Unauthorized" ||
            resp.msg === "This user doesn't exist"
          ) {
            event.target.reset();
            navigate("/loginoptions");
          } else {
            updater.TokenUpdaterHandler(resp.entamarketToken);
            dispatch(commentActions.setIsRenderComment());
            event.target.reset();
          }
        });
    }
  };

  const removeShowDelete = () => {
    dispatch(commentActions.setShowDelete(false));
  };

  const deleteCommentHandler = () => {
    fetch(`${apiUrl}comment/delete-comment?commentID=${commentID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        updater.TokenUpdaterHandler(resp.entamarketToken);
        window.location.reload();
        dispatch(commentActions.setIsRenderComment());
      });
  };

  const getCommentIDHandler = (id, text) => {
    dispatch(commentActions.setShowDelete(true));
    setCommentID(id);
    setCommentText(text);
  };

  const updateCommentHandler = () => {
    dispatch(commentActions.setShowDelete(false));
    dispatch(preloaderActions.loaderShowHandler(true));

    setTimeout(() => {
      commentRef.current.value = commentText;
      dispatch(preloaderActions.loaderShowHandler(false));
    }, 1000);

    setShowModal(true);
  };

  const saveEditedComment = (e) => {
    e.preventDefault();
    const editedComment = e.target.editComment.value;
    const edit = {
      text: editedComment,
    };
    fetch(`${apiUrl}comment/update-comment?commentID=${commentID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${entamarketToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((res) => res.json())
      .then((resp) => {
        updater.TokenUpdaterHandler(resp.entamarketToken);
        dispatch(commentActions.setIsRenderComment());
        setShowModal(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const removeErrorMsg = () => {
    setErrMsg("");
    setShowErr(false);
  };

  return (
    <div>
      {showModal ? (
        <Modal>
          <div className="modal-content">
            <div className="close__btn">
              <FaTimes className="close" onClick={closeModal} />
            </div>
            <form onSubmit={saveEditedComment}>
              <div className="form__input">
                <label>Edit review</label>
                <input ref={commentRef} name="editComment" />
                <button>Save changes</button>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}

      <div className="comment-input-box">
        <form onSubmit={addCommentsHandler} className="form">
          {showErr ? <Error errMsg={errMsg} /> : null}

          <input
            placeholder="Add Product Review"
            name="comment"
            ref={commentRef}
            onBlur={removeErrorMsg}
            onChange={removeErrorMsg}
          />
          <button>Post Review</button>
        </form>
      </div>

      {showDelete ? (
        <>
          <div className="comment-main" onClick={removeShowDelete}>
            {" "}
          </div>
          <div className="comment__settings">
            <div>
              <p onClick={updateCommentHandler}>Edit</p>
            </div>
            <div>
              <p onClick={deleteCommentHandler}>Delete</p>
            </div>
          </div>
        </>
      ) : null}

      <div className="comments-box">
        {showComment
          ? comments.map((comment) => {
              const firstName = comment.owner.username;
              const [nameLetter] = firstName.split("");
              const name = nameLetter.toUpperCase();
              return (
                <CommenList
                  key={comment._id}
                  getCommentID={() => {
                    getCommentIDHandler(comment._id, comment.text);
                  }}
                  nameLetter={name}
                  text={comment.text}
                  name={comment.owner.username}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Comments;
