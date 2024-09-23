import { FaTimes } from 'react-icons/fa';
import "../Modal/Modal.css";

const UpdateSellerModal = (props) => {
    return(
          <div className="modal-content">
            <div className="modal-close">
                <FaTimes className="close" onClick={props.closeModal}/>
            </div>

            {props.children}   
        </div>
    )
}



export default UpdateSellerModal;