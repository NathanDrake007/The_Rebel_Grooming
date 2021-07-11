const initalState = {
  products: [],
};

const orderReducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, products: action.payload };
    case "SET_CART":
      return { ...state, products: action.payload };
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
export default orderReducer;
