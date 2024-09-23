import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomeHeader.css";
import Logo from "../Logo/Logo";
import Userbox from "../userbox/Userbox";
import { FaUserAlt } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaSortDown } from "react-icons/fa";
import TraderSearchBox from "../TraderSearch/TraderSearch";
import { MdHome, MdOutlineRedeem, MdLogout } from "react-icons/md";
import { BiDiamond } from "react-icons/bi";
import TraderSearchList from "../TraderSearchList/TraderSearchList";
import { apiUrl, convertPrice } from "../utilities/utilities";
import { cartActions } from "../Store/Cart-Item-slice";
import Error from "../Error/Error";
import CartItems from "../CartItems/CartItems";
import CartItemLists from "../CartItemLists/CartItemLists";

const HomeHeader = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [searchRes, setsearchRes] = useState(false);
  const [searchMob, setSearchMob] = useState(false);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const [showAcct, setShowAcct] = useState(false);
  const [userData, setUserData] = useState([]);
  const entamarketToken = localStorage.getItem("entamarketToken");
  const navigate = useNavigate();
  const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));
  const errorMsg = useSelector((state) => state.cart.errorMsg);
  const isCartErr = useSelector((state) => state.cart.isCartErr);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (entamarketToken) {
      const getUserInfo = () => {
        if (entamarketToken) {
          fetch(`${apiUrl}user/get-user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${entamarketToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.statusCode === 200) {
                setShowAcct(true);
                setUserData(data.userData);
                dispatch(cartActions.setUserInfo(data.userData));
              } else {
                setShowAcct(false);
                localStorage.removeItem("isAuth");
                localStorage.removeItem("entamarketToken");
                dispatch(cartActions.setUserErr("Unauthorized"));
              }
            });
        }
      };

      getUserInfo();
    }

    if (cartInfo === null) {
      localStorage.setItem("cartInfo", JSON.stringify([]));
    }

    // eslint-disable-next-line
  }, [isRender]);

  let Eltype = useRef();
  let inputValue = useRef();
  let searchType = useRef();
  let searchInput = useRef();

  const logoutbtnHandler = () => {
    localStorage.removeItem("entamarketToken");
    localStorage.removeItem("isAuth");
    navigate("/loginoptions");
  };

  const loginHandler = () => navigate("/loginoptions");
  const signUpHandler = () => navigate("/SignupOptions");
  const showDropDownHandler = () => setDropDown(true);

  const closeDropDownHandler = () => {
    setDropDown(false);
    setsearchRes(false);
  };

  const SearchResultHandler = (e) => {
    if (inputValue.current.value.length === 0) {
      setTimeout(() => {
        setsearchRes(false);
      }, 500);
    } else {
      let el = Eltype.current.value.toLowerCase();
      let val = inputValue.current.value.toLowerCase();

      fetch(`${apiUrl}search?element=${el}&value=${val}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.element.length > 0) {
            setSearchData(data.element);
            setsearchRes(true);
          }
        });
    }
  };

  const SearchMobileHandler = () => {
    if (searchInput.current.value.length === 0) {
      setTimeout(() => {
        setSearchMob(false);
      }, 500);
    } else {
      let elem = searchType.current.value.toLowerCase();
      let valu = searchInput.current.value.toLowerCase();

      fetch(`${apiUrl}search?element=${elem}&value=${valu}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.element.length > 0) {
            setSearchData(data.element);
            setSearchMob(true);
          }
        });
    }
  };

  const increaseCartQunat = (id) => {
    dispatch(cartActions.showCartHandler(true));
    dispatch(cartActions.addDataToCart(id));
    setIsRender(!isRender);
  };
  const removeCartData = (id) => {
    dispatch(cartActions.showCartHandler(true));
    dispatch(cartActions.removeCartData(id));
    setIsRender(!isRender);
  };

  const showCartItems = () => {
    dispatch(cartActions.showCartHandler(true));
  };

  const deleteItemHandler = (id) => {
    dispatch(cartActions.setDeleteCartItems(id));
    dispatch(cartActions.setisCartRender());
    setIsRender(!isRender);
  };

  const goToDashboard = () => {
    if (userData.accountType === "buyer") {
      navigate("/buyerdashboard");
    } else if (userData.accountType === "trader") {
      navigate("/traderdashboard");
    }
  };

  const goToProductHandler = (id, name) => {
    let nameProd = name.replace(/\s/g, "-");
    navigate(`/product?id=${id}&name=${nameProd}`);
  };

  return (
    <div>
      <div className="home__header">
        {showCart ? (
          <CartItems>
            {isCartErr ? <Error errMsg={errorMsg} /> : null}
            {cartInfo.length > 0 ? (
              cartInfo.map((item) => {
                return (
                  <CartItemLists
                    increaseCartQunat={() => increaseCartQunat(item.items._id)}
                    removeCartData={() => removeCartData(item.items._id)}
                    key={item.items._id}
                    img={item.items.images[0]}
                    prodName={item.items.name}
                    quantity={item.quant}
                    deleteItem={() => {
                      deleteItemHandler(item.items._id);
                    }}
                    prodPrice={convertPrice(item.items.price)}
                  />
                );
              })
            ) : (
              <div className="cart-empty">
                <span>
                  <RiShoppingCart2Line className="cart-icon-empty" />
                </span>
                <p>Your Cart is empty</p>
              </div>
            )}
          </CartItems>
        ) : null}

         <Logo width="160px" logoColor="#81007F" /> 
        
        <div className="search-box">
          <input
            placeholder="Search for Traders, Shops & Products"
            name="inpvalue"
            className="input-search"
            ref={inputValue}
            onKeyUp={SearchResultHandler}
          />

          <div className="form__input inp2">
            <select name="eltype" ref={Eltype}>
              <option value="Product">Filter</option>
              <option value="Shop">Shop</option>
              <option value="Product">Product</option>
              <option value="Trader">Trader</option>
            </select>
          </div>

          {searchRes ? (
            <TraderSearchBox closeBox={closeDropDownHandler}>
              {searchData.map((el) => (
                <TraderSearchList
                  key={el._id}
                  goToProductHandler={() => goToProductHandler(el._id, el.name)}
                  searchInfo={el.name}
                  firstName={el.firstName}
                />
              ))}
            </TraderSearchBox>
          ) : null}

          <div className="cart-icon" onClick={showCartItems}>
            <span>
              <RiShoppingCart2Line />
            </span>
            <span className="cart-items">
              {cartInfo === null ? 0 : cartInfo.length}
            </span>
          </div>
        </div>

        <div className="auth-btns">
          {showAcct ? (
            <Userbox
              userIcon={<FaUserAlt className="user-icon" />}
              className="user-sort"
              headerAccount={`Hi ${userData.username}`}
              showDropDown={showDropDownHandler}
              downArrow={<FaSortDown className="user-sort" />}
            />
          ) : null}

          {showAcct ? (
            <button
              className="btn-auth login-btn mob-logout"
              onClick={logoutbtnHandler}
            >
              Logout
            </button>
          ) : (
            <div className="auth-btns">
              <button className="btn-auth login-btn" onClick={loginHandler}>
                Login
              </button>
              <button className="btn-auth logout-btn" onClick={signUpHandler}>
                Signup
              </button>
            </div>
          )}
        </div>

        {dropDown ? (
          <div className="account-login">
            <div className="header-account-box">
              <div className="close-acct-box" onClick={closeDropDownHandler}>
                <span>
                  <FaTimes />
                </span>
              </div>

              <div className="acct-login-btn-box">
                <span className="box-icon">
                  <MdHome />
                </span>
                <span className="acct-box-link" onClick={goToDashboard}>
                  Dashboard
                </span>
              </div>

              {userData.accountType === "buyer" ? (
                <div className="acct-login-btn-box">
                  <span className="box-icon">
                    <MdOutlineRedeem />
                  </span>
                  <span className="acct-box-link" onClick={goToDashboard}>
                    Orders
                  </span>
                </div>
              ) : null}

              {userData.accountType === "buyer" ? (
                <div className="acct-login-btn-box">
                  <span className="box-icon">
                    <BiDiamond />
                  </span>
                  <span className="acct-box-link" to="/buyerdashboard">
                    Favourite Shops
                  </span>
                </div>
              ) : null}

              <div
                className="acct-login-btn-box text-center"
                onClick={logoutbtnHandler}
              >
                <span className="box-icon">
                  <MdLogout />
                </span>
                <span className="acct-box-link add-acct middle">Log out</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="search-mobile">
        <input
          placeholder="Search for Traders, Shops & Products"
          name="inpvalue"
          className="input-search"
          ref={searchInput}
          onKeyUp={SearchMobileHandler}
        />

        <div className="mob-select">
          <select name="eltype" ref={searchType}>
            <option value="Product">Filter</option>
            <option value="Shop">Shop</option>
            <option value="Product">Product</option>
            <option value="Trader">Trader</option>
          </select>
        </div>

        {searchMob ? (
          <TraderSearchBox closeBox={closeDropDownHandler}>
            {searchData.map((el) => (
              <TraderSearchList
                key={el._id}
                goToProductHandler={() => goToProductHandler(el._id, el.name)}
                searchInfo={el.name}
                firstName={el.firstName}
              />
            ))}
          </TraderSearchBox>
        ) : null}
      </div>
    </div>
  );
};

export default HomeHeader;
