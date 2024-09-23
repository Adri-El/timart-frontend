import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewCategory.css";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomeBody from "../HomeBody/HomeBody";
import HomeProductLists from "../HomeProductList/HomeProductList";
import { apiUrl, convertPrice } from "../utilities/utilities";
import HomeFooter from "../HomeFooter/HomeFooter";
import Preloader from "../preloader/Preloader";
import { cartActions } from "../Store/Cart-Item-slice";
import { titleUpdater } from "../utilities/titleUpdater";
import { useDispatch } from "react-redux";

const ViewCategory = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);
  let count = 0;
  const navigate = useNavigate();
  let categoryName = window.location.href.split("?name=")[1];

  if (categoryName) {
    if (categoryName === "Health&Beauty") {
      categoryName = "Health & Beauty";
    } else if (categoryName === "Householdsupplies") {
      categoryName = "Household supplies";
    } else if (categoryName === "Construction,Tools/repairequipment") {
      categoryName = "Construction, Tools/ repair equipment";
    }
  } else {
    navigate("/");
  }
  titleUpdater(`Entamarket - ${categoryName} Category `);

  const getHomeProducts = () => {
    fetch(`${apiUrl}home-page?page=${count}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.statusCode === 200) {
          const prodArr = resp.products.filter(
            (product) => product.category === categoryName
          );
          setShowLoader(false);
          if (prodArr.length > 0) {
            setProducts(prodArr);
          } else {
            setShowError(true);
          }
        } else {
          setShowLoader(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHomeProducts();
    // eslint-disable-next-line
  }, [count]);

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

  return (
    <div>
      {showLoader ? <Preloader /> : null}
      <HomeHeader />

      {showError ? (
        <div className="errorDivBox">
          <div className="errorBoxContent2">
            <span>No Product Available</span>
          </div>
        </div>
      ) : null}

      <HomeBody homeTitle={`${categoryName} Category`}>
        {products.map((product) => {
          if (product.category === categoryName) {
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
                    return false;
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

export default ViewCategory;
