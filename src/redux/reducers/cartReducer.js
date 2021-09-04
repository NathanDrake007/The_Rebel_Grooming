const initalState = {
  products: [],
};

const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        products: [],
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        products: action.payload.newCart,
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        products: action.payload.newCart,
      };
    default:
      return state;
  }
};
export default cartReducer;
