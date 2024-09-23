import { FaTimes } from 'react-icons/fa';
import "./CreateShop.css";

const CreateShop = (props) => {
    return(
        <div className="modal-content">
            <div className="modal-close">
                <FaTimes className="close" onClick={props.closeModal}/>
            </div>

            {props.children}   
        </div>
    )
}


export default CreateShop;