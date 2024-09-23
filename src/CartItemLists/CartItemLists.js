import { MdDelete } from "react-icons/md";
import { cartActions } from "../Store/Cart-Item-slice";
import { useDispatch } from "react-redux";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CartItemLists = (props) => {
  const dispatch = useDispatch();
  const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
  const isCartRender = useSelector((state) => state.cart.isCartRender);

  useEffect(() => {}, [cartInfo, isCartRender]);

  const increaseQuant = () => {
    dispatch(cartActions.setIncreaseQuant());
    props.increaseCartQunat();
    dispatch(cartActions.setisCartRender());
  };

  const decreaseQuant = () => {
    dispatch(cartActions.setDecreaseQuant());
    props.removeCartData();
    dispatch(cartActions.setisCartRender());
  };

  return (
    <div className="cartitem-box">
      <div className="cart-item-list-box">
        <div className="cartimgbox">
          <img src={props.img} alt="cart-img" />
        </div>

        <div className="item-info">
          <p>Product Name: {props.prodName}</p>
          <p>Product Price: {props.prodPrice}</p>
          <p>Quantity: {props.quantity}</p>
        </div>
      </div>

      <div className="product__quantity">
        <BsPlusLg className="quant__icon" onClick={increaseQuant} />
        <span className="quant__span">{props.quantity}</span>
        <BsDashLg className="quant__icon" onClick={decreaseQuant} />
      </div>

      <div className="delete-btn">
        <MdDelete className="delete-button" onClick={props.deleteItem} />
      </div>
    </div>
  );
};

export default CartItemLists;
