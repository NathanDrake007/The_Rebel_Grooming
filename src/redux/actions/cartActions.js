import { firestore } from "../../utils/firebase";
export const addToCart = (payload) => async (dispatch, getState) => {
  const cart = [...getState().cart.products];
  const index = cart.findIndex((p) => p.id === payload.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(payload);
  }
  const price = getState().cart.totalPrice + parseFloat(payload.price);
  if (getState().auth.isSignedIn) {
    await firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: cart, totalPrice: price });
  }
  dispatch({ type: "ADD_TO_CART", payload: { cart, price } });
};

export const removeFromCart = (payload) => async (dispatch, getState) => {
  const currentProduct = getState().cart.products.find((p) => p.id === payload);
  const cart = [...getState().cart.products].filter((p) => p.id !== payload);
  const price =
    getState().cart.totalPrice -
    parseFloat(currentProduct.price) * currentProduct.quantity;
  if (getState().auth.isSignedIn) {
    await firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: cart, totalPrice: price });
    if (cart.length === 0) {
      console.log("delete");
      await firestore.collection("cart").doc(getState().auth.userId).delete();
    }
  }
  dispatch({ type: "REMOVE_FROM_CART", payload: { cart, price } });
};

export const clearCart = () => async (dispatch, getState) => {
  console.log("clear cart");
  if (getState().auth.isSignedIn) {
    await firestore.collection("cart").doc(getState().auth.userId).delete();
  }
  return {
    type: "CLEAR_CART",
  };
};
export const increaseQuantity = (id) => async (dispatch, getState) => {
  const products = getState().cart.products;
  const index = products.findIndex((_product) => _product.id === id);
  const newCart = [...products];
  newCart[index].quantity += 1;
  const price = getState().cart.totalPrice + parseFloat(newCart[index].price);
  if (getState().auth.isSignedIn) {
    await firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: newCart, totalPrice: price });
  }
  dispatch({
    type: "INCREASE_QUANTITY",
    payload: { newCart, price },
  });
};
export const decreaseQuantity = (id) => async (dispatch, getState) => {
  const products = getState().cart.products;
  const index = products.findIndex((_product) => _product.id === id);
  const newCart = [...products];
  newCart[index].quantity -= 1;
  const price = getState().cart.totalPrice - parseFloat(newCart[index].price);
  if (getState().auth.isSignedIn) {
    await firestore
      .collection("cart")
      .doc(getState().auth.userId)
      .set({ products: newCart, totalPrice: price });
  }
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: { newCart, price },
  });
};
