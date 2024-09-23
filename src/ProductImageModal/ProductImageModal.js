import "./ProductImageModal.css";

const ProductImageModal = (props) => {
    return(
        <div className="prod__img-main">
            
            <div className="prod-image-con">
                 <img src={props.link} width="60px" alt="prod-img" onClick={props.removeImg}/>
            </div>
            
        </div>
    )
}


export default ProductImageModal;