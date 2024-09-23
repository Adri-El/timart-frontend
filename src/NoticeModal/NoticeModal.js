import { FaRegBell } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import "./NoticeModal.css";

const NoticeModal = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-close">
        <FaTimes className="close" onClick={props.closeModal} />
      </div>
      <FaRegBell className="bell-icon" />

      <div className="notifications">
        {/* <p>No Notification Available</p> */}

        {props.children}
      </div>
    </div>
  );
};

export default NoticeModal;
