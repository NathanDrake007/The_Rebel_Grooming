const initalState = {
  products: [],
  totalPrice: 0.0,
};

const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: action.payload.cart,
        totalPrice: action.payload.price,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: action.payload.cart,
        totalPrice: action.payload.price,
      };
    case "CLEAR_CART":
      return {
        ...state,
        products: [],
        totalPrice: 0,
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        products: action.payload,
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
