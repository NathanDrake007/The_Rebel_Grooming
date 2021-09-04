export const addToCart = (product) => (dispatch, getState) => {
  const cart = [...getState().cart.products]; // returns current cart product ids
  const index = cart.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(product);
  }
  dispatch({ type: "ADD_TO_CART", payload: cart });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  const cart = [...getState().cart.products].filter((p) => p.id !== productId);
  dispatch({ type: "REMOVE_FROM_CART", payload: cart });
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
