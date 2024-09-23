import { FaInfoCircle } from "react-icons/fa";

const DeleteModal = (props) => {
  return (
    <div className="modal-content delete-content">
      <h2>
        {props.titleText1} {props.accountType} {props.titleText2}
      </h2>

      <div className="pop-info">
        <FaInfoCircle className="iconcolor" />
        <p>{props.note}</p>
      </div>

      <div className="delete-btns">
        <button onClick={props.cancelHandler}>Cancel</button>
        <button className="btn-danger" onClick={props.deleteHandler}>
          {props.btnValue}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
