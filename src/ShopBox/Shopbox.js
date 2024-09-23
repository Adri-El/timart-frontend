import "./ShopBox.css";

const ShopBox = (props) => {
    return(
         <div className={props.shopClass} onClick={props.openShop}>
         <div className="shop-box-flex">
               {props.shopIcon}
                <h2>{props.shopboxName}</h2>
             </div>
        <p>{props.ShopBoxValue}</p>
     </div>
    )
};


export default ShopBox;