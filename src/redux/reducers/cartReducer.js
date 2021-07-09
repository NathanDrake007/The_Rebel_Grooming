const initalState = {
  userId: null,
  products: [],
};

const orderReducer = (state = initalState, action) => {
  var newCart, index;
  switch (action.type) {
    case "ADD_TO_CART":
      newCart = [...state.products, action.payload.product];
      return { ...state, userId: action.payload.userId, products: newCart };
    case "INCREASE_QUANTITY":
      index = state.products.findIndex(
        (_product) => _product.id === action.payload
      );
      newCart = [...state.products];
      newCart[index].quantity += 1;
      return {
        ...state,
        products: newCart,
      };
    case "DECREASE_QUANTITY":
      index = state.products.findIndex(
        (_product) => _product.id === action.payload
      );
      newCart = [...state.products];
      newCart[index].quantity -= 1;
      return {
        ...state,
        products: newCart,
      };
    default:
      return state;
  }
};
export default orderReducer;
