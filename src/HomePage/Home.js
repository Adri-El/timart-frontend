import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl, convertPrice } from "../utilities/utilities";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeBody from "../HomeBody/HomeBody";
import HomeProductLists from "../HomeProductList/HomeProductList";
import HomeFooter from "../HomeFooter/HomeFooter";
import advert from "../Assets/Advert Banners/banner-advert.jpg";
import Preloader from "../preloader/Preloader";
import { cartActions } from "../Store/Cart-Item-slice";
import { titleUpdater } from "../utilities/titleUpdater";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import { MdOutlineError } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import "./Home.css";
import banner1 from "../../src/Assets/Advert Banners/guy1.jpg";
import banner2 from "../../src/Assets/Advert Banners/guy2.jpg";
import banner3 from "../../src/Assets/Advert Banners/girl1.jpg";

const Home = (props) => {
  titleUpdater("TImart - Trade Fair Virtual Market");
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const [offlineModal, setOfflineModal] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [products, setProducts] = useState([]);
  let count = 0;
  const categoryData = [
    "Vehicles",
    "Electronics",
    "Health & Beauty",
    "Fashion",
    "Groceries",
    "Babies/kids",
    "Household supplies",
    "Construction, Tools/ repair equipment",
  ];

  const [Vehicles, Electronics, HealthB, Fashion, Groceries] = [
    "Vehicles",
    "Electronics",
    "Health & Beauty",
    "Fashion",
    "Groceries",
    "Babies/kids",
    "Household supplies",
    "Construction, Tools/ repair equipment",
  ];

  const getHomeProducts = () => {
    const online = window.navigator.onLine;
    if (online) {
      fetch(`${apiUrl}home-page?page=${count}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((resp) => {
          if (resp.statusCode === 200) {
            setProducts(resp.products);
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
    getHomeProducts();
    // eslint-disable-next-line
  }, [count]);

  const navigate = useNavigate();

  const showSingleProduct = (prodId, prodName) => {
    let nameProd = prodName.replace(/\s/g, "-");
    navigate(`/product?id=${prodId}&name=${nameProd}`);
    window.scrollTo(0, 0);
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

  const handleViewCategory = (category, ref) => {
    let name = category.replace(/\s/g, "");
    navigate(`/category?name=${name}`);
    window.scrollTo(0, 0);
  };
  const goToCustomerSupport = () => {
    navigate(`/support`);
  };

  const goToTermsPage = () => {
    navigate(`/returns-policy`);
  };

  return (
    <div className="homepage">
      
      {showLoader ? <Preloader /> : null}

      {offlineModal ? (
        <Modal closeModal={closeModalHandler}>
          {isOff ? (
            <div className="content-box">
              <span>Internet disconnected, check internet.</span>
            </div>
          ) : null}

          {errorShow ? (
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
          ) : null}
        </Modal>
      ) : null}

      <HomeHeader />

      <div className="carobox">
        <div className="categorySide">
          <div
            className="boxCatView"
            onClick={() => handleViewCategory(Electronics)}
          >
            <p>
              <b>Categories</b>
            </p>
            <input
              type="radio"
              checked
              onChange={() => handleViewCategory(Electronics)}
            />
          </div>
          <div
            className="boxCatView"
            onClick={() => handleViewCategory(Electronics)}
          >
            <p>{Electronics}</p>
            <input
              type="radio"
              onChange={() => handleViewCategory(Electronics)}
            />
          </div>

          <div
            className="boxCatView"
            onClick={() => handleViewCategory(Groceries)}
          >
            <p>{Groceries}</p>
            <input type="radio" />
          </div>

          <div
            className="boxCatView"
            onClick={() => handleViewCategory(Vehicles)}
          >
            <p>{Vehicles}</p>
            <input type="radio" />
          </div>

          <div
            className="boxCatView"
            onClick={() => handleViewCategory(HealthB)}
          >
            <p>{HealthB}</p>
            <input type="radio" />
          </div>

          <div
            className="boxCatView"
            onClick={() => handleViewCategory(Fashion)}
          >
            <p>{Fashion}</p>
            <input type="radio" onChange={() => handleViewCategory(Fashion)} />
          </div>
        </div>

        <div className="carouseBox">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
          >
            <div className="carouselBoxImg">
              <img src={banner2} alt="advert" />
            </div>
            <div>
              <img src={banner1} alt="advert" />
            </div>
            <div>
              <img src={banner3} alt="advert" />
            </div>
          </Carousel>
        </div>

        <div className="categorySide">
          <div className="boxCatView">
            <p>
              <b>Need Help or Support?</b>
            </p>
          </div>

          <div className="boxCatView">
            <div className="boxMd2Flex">
              <MdOutlineMarkEmailUnread />
              <p>support@timart.com</p>
            </div>
          </div>

          <div className="boxCatView">
            <div className="boxMd2Flex">
              <FiPhoneCall />
              <p>+234 xxxxxxxxxx</p>
            </div>
          </div>

          <div className="boxCatView">
            <div className="boxMd2Flex" onClick={goToCustomerSupport}>
              <IoChatbubbleEllipsesOutline />
              <p>Customer Support</p>
            </div>
          </div>

          <div className="boxCatView">
            <div className="boxMd2Flex" onClick={goToTermsPage}>
              <MdOutlinePolicy />
              <p>Returns Policy/Terms of service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobileCategoryBox1">
        <h4>Categories</h4>
        <div className="mobileCategory">
          {categoryData.map((item, index) => (
            <div className="categoryBtnBox" key={index}>
              <button onClick={() => handleViewCategory(item)}>{item}</button>
            </div>
          ))}
        </div>
      </div>

      <HomeBody homeTitle="Top Market Products">
        {products.map((product) => {
          if (product.stock > 0) {
            return (
              <HomeProductLists
                key={product._id}
                img={product.images}
                prodname={product.name}
                stock={product.stock}
                price={convertPrice(product.price)}
                showSingleProduct={() => {
                  showSingleProduct(product._id, product.name);
                }}
                homeAddToCart={() => {
                  if (parseInt(product.stock) === 0) {
                    return showProductAddError();
                  } else {
                    return homeAddToCart(product._id);
                  }
                }}
              />
            );
          } else {
            return false;
          }
        })}
      </HomeBody>

      <HomeFooter />
    </div>
  );
};

export default Home;
