// import { firestore } from "../../helper/firebase";

export const addToCart = (payload) => (dispatch, getState) => {
  alert("Added to Cart");
  dispatch({ type: "ADD_TO_CART", payload });
};
export const placeOrder = (payload) => (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER", payload });
};

export const increaseQuantity = (id) => {
  return {
    type: "INCREASE_QUANTITY",
    payload: id,
  };
};
export const decreaseQuantity = (id) => {
  return {
    type: "DECREASE_QUANTITY",
    payload: id,
  };
};
