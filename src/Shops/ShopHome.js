import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl, convertPrice } from "../utilities/utilities";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeBody from "../HomeBody/HomeBody";
import HomeProductLists from "../HomeProductList/HomeProductList";
import HomeFooter from "../HomeFooter/HomeFooter";
import Preloader from "../preloader/Preloader";
import { cartActions } from "../Store/Cart-Item-slice";
import { titleUpdater } from "../utilities/titleUpdater";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import { MdOutlineError } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

const ShopHome = (props) => {
  titleUpdater("Entamarket - Trade Fair Virtual Market");
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const [offlineModal, setOfflineModal] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [isShopName, setIshopName] = useState(false);
  let count = 0;

  const getHomeProducts = (user) => {
    const online = window.navigator.onLine;

    if (online) {
      fetch(`${apiUrl}shop/${user}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.statusCode === 200) {
            console.log(resp.shopData);
            setShopData(resp.shopData);
            setProducts(resp.shopData.products);
            setIshopName(true);
            setShowLoader(false);
          } else {
            setShowLoader(false);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setShowLoader(false);
      setOfflineModal(true);
      setIsOff(true);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const shopUsername = url.split("?u=")[1];
    getHomeProducts(shopUsername);

    // eslint-disable-next-line
  }, [count]);

  const navigate = useNavigate();

  const showSingleProduct = (prodId) => {
    navigate("/product");
    window.scrollTo(0, 0);
    localStorage.setItem("prodID", prodId);
  };

  const homeAddToCart = (id) => {
    setShowLoader(true);
    fetch(`${apiUrl}product/get-product?productID=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp) {
          const cartItems = {
            items: resp.productData,
            quant: 1,
          };
          dispatch(cartActions.showCartHandler(true));
          dispatch(cartActions.setCartData(cartItems));
          setShowLoader(false);
        } else {
          setShowLoader(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const showProductAddError = () => {
    setOfflineModal(true);
    setErrorShow(true);
  };

  const closeModalHandler = () => {
    setOfflineModal(false);
    setErrorShow(false);
  };

  return (
    <div className="homepage">
      {showLoader ? <Preloader /> : null}

      {offlineModal ? (
        <Modal closeModal={closeModalHandler}>
          {isOff ? (
            <div className="content-box">
              <span>
                You are not Connected to the Internet, Please check your
                internet connection.
              </span>
            </div>
          ) : null}

          {errorShow ? (
            <div className="error-content-box">
              <div className="error-content">
                <div className="error-icon-box-con">
                  <MdOutlineError className="error-icon" />
                </div>

                <span className="spantext">
                  Sorry, This Product is Out of Stock and Can't be Purchased
                </span>
              </div>
            </div>
          ) : null}
        </Modal>
      ) : null}

      <HomeHeader />

      <div className="business__info">
        <div className="business__name">
          {isShopName ? (
            <>
              <span>{shopData.name.split("")[0].toUpperCase()}</span>
              <p>{shopData.name}</p>
            </>
          ) : null}
        </div>

        <div className="business__location">
          <div className="box-info-data">
            <GoLocation className="shop__locate" />
            <span className="shop-name">
              {isShopName ? shopData.shopAddress : null}
            </span>
          </div>
          <div className="box-info-data">
            <FiPhone className="phone__ic" />
            <a
              href={`tel:${isShopName ? shopData.owner.phoneNumber : null}`}
              className="shop_pho"
            >
              {isShopName ? shopData.owner.phoneNumber : null}
            </a>
          </div>
        </div>
      </div>
      <HomeBody homeTitle={`Top Selling Products`}>
        {products.map((product) => (
          <HomeProductLists
            key={product._id}
            img={product.images}
            prodname={product.name}
            stock={product.stock}
            price={convertPrice(product.price)}
            showSingleProduct={() => {
              showSingleProduct(product._id);
            }}
            homeAddToCart={() => {
              if (parseInt(product.stock) === 0) {
                return showProductAddError();
              } else {
                return homeAddToCart(product._id);
              }
            }}
          />
        ))}
      </HomeBody>

      <HomeFooter />
    </div>
  );
};

export default ShopHome;
