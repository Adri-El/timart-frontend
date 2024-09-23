import { FaTimes } from 'react-icons/fa';

const UpdateProductModal = (props) => {
    return(
        <div className="modal-content">
            <div className="modal-close">
                <FaTimes className="close" onClick={props.closeModal}/>
            </div>

            {props.children}   
        </div>
    )
}

export default UpdateProductModal;