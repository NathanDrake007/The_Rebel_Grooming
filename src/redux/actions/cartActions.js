export const addToCart = (payload) => (dispatch, getState) => {
  const cart = [...getState().cart.products];
  const index = cart.findIndex((p) => p.id === payload.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(payload);
  }
  const price = getState().cart.totalPrice + parseFloat(payload.price);
  // if (getState().auth.isSignedIn) {
  //   firestore
  //     .collection("cart")
  //     .doc(getState().auth.userId)
  //     .set({ products: cart });
  // }
  alert("Added to Cart");
  dispatch({ type: "ADD_TO_CART", payload: { cart, price } });
};

export const removeFromCart = (payload) => (dispatch, getState) => {
  const cart = [...getState().cart.products].filter((p) => p.id !== payload);
  // if (getState().auth.isSignedIn) {
  //   firestore
  //     .collection("cart")
  //     .doc(getState().auth.userId)
  //     .set({ products: cart });
  // }
  const price = getState().cart.totalPrice - payload.price;
  alert("item removed from Cart");
  dispatch({ type: "REMOVE_FROM_CART", payload: { cart, price } });
};

export const clearCart = () => {
  console.log("clear cart");
  return {
    type: "CLEAR_CART",
  };
};
export const increaseQuantity = (id) => (dispatch, getState) => {
  const products = getState().cart.products;
  const index = products.findIndex((_product) => _product.id === id);
  const newCart = [...products];
  newCart[index].quantity += 1;
  // if (getState().auth.isSignedIn) {
  //   firestore
  //     .collection("cart")
  //     .doc(getState().auth.userId)
  //     .set({ products: newCart });
  // }
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

  // if (getState().auth.isSignedIn) {
  //   firestore
  //     .collection("cart")
  //     .doc(getState().auth.userId)
  //     .set({ products: newCart });
  // }
  dispatch({
    type: "DECREASE_QUANTITY",
    payload: newCart,
  });
};
