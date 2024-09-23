import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FormButton } from "../Form-Input/FormInput";
import { cartActions } from "../Store/Cart-Item-slice";
import { preloaderActions } from "../Store/Preloader-Slice";
import Preloader from "../preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { convertPrice } from "../utilities/utilities";
import "./CartItems.css";

const CartItems = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaderShow = useSelector((state) => state.loader.loaderShow);
  const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
  const isCartRender = useSelector((state) => state.cart.isCartRender);

  let price = 0;
  useEffect(() => {
    dispatch(preloaderActions.loaderShowHandler(false));
  }, [dispatch, isCartRender]);

  const totalPrice = () => {
    for (let item of cartInfo) {
      price += parseInt(item.items.price) * item.quant;
    }
    return price;
  };

  const closeCartItems = () => {
    dispatch(cartActions.showCartHandler(false));
  };

  const goToCheckout = () => {
    navigate("/checkout");
    closeCartItems();
  };
  return (
   <div>
     {loaderShow ? <Preloader /> : null}
    <div className="cart-items-main-box" onClick={closeCartItems}></div>

      <div className="cart-item-box-content">
        <div className="close-cart-modal">
          <FaTimes className="cart-close-icon" onClick={closeCartItems} />
        </div>
        {props.children}

        {cartInfo.length > 0 ? (
          <>
            <div className="total-cart-price">
              <span>Total Price: {convertPrice(totalPrice())}</span>
            </div>

            <FormButton btnValue="Check Out" btnAction={goToCheckout} />
          </>
        ) : null}
      </div>
   </div>
  );
};

export default CartItems;
