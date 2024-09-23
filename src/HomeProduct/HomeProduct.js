import React, { useEffect, useState } from "react";
import { apiUrl, convertPrice } from "../utilities/utilities";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeFooter from "../HomeFooter/HomeFooter";
import HomeSingleProd from "../HomeSingleProd/HomeSingleProd";
import Preloader from "../preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Store/Cart-Item-slice";
import { preloaderActions } from "../Store/Preloader-Slice";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { MdOutlineError } from "react-icons/md";
import "./HomeProduct.css";

const HomeProduct = (props) => {
  const [prodData, setProdData] = useState([]);
  const [showProdData, setShowProdData] = useState(false);
  const [showErrorModal, setShowErrModal] = useState(false);
  const loaderShow = useSelector((state) => state.loader.loaderShow);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantInc = useSelector((state) => state.cart.quantInc);

  useEffect(() => {
    dispatch(preloaderActions.loaderShowHandler(true));
    dispatch(cartActions.setCartQuantReset());
    if (window.location.href.includes("?id=")) {
      const idData = window.location.href.split("?id=")[1];
      if (idData) {
        const prodIdData = idData.split("&name=")[0];
        fetch(`${apiUrl}product/get-product?productID=${prodIdData}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((resp) => {
            if (resp.statusCode === 200) {
              setProdData(resp.productData);
              setShowProdData(true);
              dispatch(preloaderActions.loaderShowHandler(false));
            } else {
              navigate("/");
            }
          })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [cartItems, dispatch]);

  const addProductToCart = () => {
    const cartItems = {
      items: prodData,
      quant: quantInc,
    };
    dispatch(cartActions.showCartHandler(true));
    dispatch(cartActions.setCartData(cartItems));
  };

  const increaseCartQunat = () => {
    const cartItems = {
      items: prodData,
      quant: quantInc,
    };
    dispatch(cartActions.showCartHandler(true));
    dispatch(cartActions.addDataToCart(cartItems));
  };
  const removeCartData = () => {
    const cartItems = {
      items: prodData,
      quant: quantInc,
    };
    dispatch(cartActions.showCartHandler(true));
    dispatch(cartActions.removeCartData(cartItems));
  };

  const closeModal = () => {
    setShowErrModal(false);
  };

  const showAddToCartError = () => {
    setShowErrModal(true);
  };

  return (
    <div className="single__prod">
      {loaderShow ? <Preloader /> : null}

      {showErrorModal ? (
        <Modal closeModal={closeModal}>
          <div className="error-content-box">
            <div className="error-content">
              <div className="error-icon-box-conbxmain">
                <MdOutlineError className="error-icon" />
              </div>

              <span className="spantext">
                Sorry, This Product is Out of Stock and Can't be Purchased
              </span>
            </div>
          </div>
        </Modal>
      ) : null}

      <HomeHeader
        increaseCartQunat={increaseCartQunat}
        removeCartData={removeCartData}
      />

      <div className="product_single">
        {showProdData ? (
          <HomeSingleProd
            prodName={prodData.name}
            prodQuantity={prodData.stock}
            prodWeight={prodData.weight ? prodData.weight : null}
            phone={prodData.owner.phoneNumber}
            price={convertPrice(prodData.price)}
            prodDesc={prodData.description}
            imgUrl={prodData.images}
            shopName={prodData.shop.name}
            address={prodData.shop.shopAddress}
            addProductToCart={() => {
              if (parseInt(prodData.stock) === 0) {
                return showAddToCartError();
              } else {
                return addProductToCart();
              }
            }}
          />
        ) : null}
      </div>

      <HomeFooter />
    </div>
  );
};

export default HomeProduct;
