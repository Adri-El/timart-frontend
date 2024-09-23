import { createSlice } from "@reduxjs/toolkit";

const cartItemSlice = createSlice({
  name: "cart-item-slice",
  initialState: {
    cartQuantity: 0,
    cartItems: [],
    showCart: false,
    isCartRender: true,
    isItems: false,
    userInfo: "",
    cartData: [],
    quantInc: 1,
    getId: "",
    errorMsg: "",
    isCartErr: false,
    userErr: "",
  },
  reducers: {
    updateCartQuantity(state) {
      state.cartQuantity = state.cartQuantity + 1;
    },
    getCartItems(state, actions) {
      state.cartItems = actions.payload;
    },
    showCartHandler(state, actions) {
      state.showCart = actions.payload;
      state.isCartErr = false;
      state.errorMsg = "";
    },
    setisCartRender(state) {
      state.isCartRender = !state.isCartRender;
    },
    setIsItems(state, actions) {
      state.isItems = actions.payload;
    },

    setUserInfo(state, actions) {
      state.userInfo = actions.payload;
    },
    setIncreaseQuant(state) {
      state.quantInc += 1;
    },
    setDecreaseQuant(state) {
      state.quantInc -= 1;
    },
    setCartQuantReset(state, actions) {
      state.quantInc = 1;
    },
    setCartData(state, actions) {
      const cartItemData = JSON.parse(localStorage.getItem("cartInfo"));
      const exists = cartItemData.findIndex(
        (item) => item.items._id === actions.payload.items._id
      );
      if (exists >= 0) {
        state.isCartErr = true;
        state.errorMsg = "Item already added to cart";
      } else {
        state.cartData = [...cartItemData, actions.payload];
        localStorage.setItem("cartInfo", JSON.stringify(state.cartData));
      }
    },
    addDataToCart(state, actions) {
      const cartItemData = JSON.parse(localStorage.getItem("cartInfo"));
      const exists = cartItemData.findIndex(
        (item) => item.items._id === actions.payload
      );
      if (exists >= 0) {
        if (
          cartItemData[exists].quant >=
          parseInt(cartItemData[exists].items.stock)
        ) {
          state.isCartErr = true;
          state.errorMsg = "You have reached stock Limit";
        } else {
          cartItemData[exists].quant += 1;
          localStorage.setItem("cartInfo", JSON.stringify(cartItemData));
        }
      } else {
        state.cartData = [...cartItemData, actions.payload];
        localStorage.setItem("cartInfo", JSON.stringify(state.cartData));
      }
    },
    removeCartData(state, actions) {
      const cartItemData = JSON.parse(localStorage.getItem("cartInfo"));
      const exists = cartItemData.findIndex(
        (item) => item.items._id === actions.payload
      );
      if (exists >= 0) {
        if (cartItemData[exists].quant <= 1) {
          cartItemData[exists].quant = 1;
        } else {
          cartItemData[exists].quant -= 1;
          localStorage.setItem("cartInfo", JSON.stringify(cartItemData));
        }
      } else {
        state.cartData = [...state.cartData, actions.payload];
        localStorage.setItem("cartInfo", JSON.stringify(cartItemData));
      }
    },

    setGetId(state, actions) {
      state.getId = actions.payload;
    },

    setDeleteCartItems(state, actions) {
      const cartItemData = JSON.parse(localStorage.getItem("cartInfo"));
      const filtered = cartItemData.filter((item) => {
        return item.items._id !== actions.payload;
      });
      localStorage.setItem("cartInfo", JSON.stringify(filtered));
    },

    setUserErr(state, actions) {
      state.userErr = actions.payload;
    },
  },
});

export const cartActions = cartItemSlice.actions;
export const cartReducers = cartItemSlice.reducer;
