import "./Modal.css";


const Modal = (props) => {
    return(
       <div>
         <div className="popup-modal" onClick={props.closeModal}></div>
         {props.children}
       </div>
    )
}

export default Modal;