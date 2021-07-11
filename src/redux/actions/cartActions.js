import { firestore } from "../../helper/firebase";

export const addToCart = (payload) => (dispatch, getState) => {
  const cart = [...getState().cart.products, payload];
  if (getState().auth.isSignedIn) {
    firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: cart });
  }
  alert("Added to Cart");
  dispatch({ type: "ADD_TO_CART", payload: cart });
};

export const setCart = (payload) => {
  return {
    type: "SET_CART",
    payload,
  };
};
export const placeOrder = (payload) => (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER", payload });
};

export const increaseQuantity = (id) => (dispatch, getState) => {
  const products = getState().cart.products;
  const index = products.findIndex((_product) => _product.id === id);
  const newCart = [...products];
  newCart[index].quantity += 1;
  if (getState().auth.isSignedIn) {
    firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: newCart });
  }
  dispatch({
    type: "INCREASE_QUANTITY",
    payload: newCart,
  });
};
export const decreaseQuantity = (id) => (dispatch, getState) => {
  const products = getState().cart.products;
  const index = products.findIndex((_product) => _product.id === id);
  const newCart = [...products];
  newCart[index].quantity -= 1;

  if (getState().auth.isSignedIn) {
    firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: newCart });
  }
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: newCart,
  });
};
