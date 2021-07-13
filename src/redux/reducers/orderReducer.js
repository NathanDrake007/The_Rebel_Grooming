const initialState = {
  orders: [],
  lastOrder: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return {
        ...state,
        orders: action.payload,
        lastOrder: action.payload[action.payload.length - 1].orderId,
      };
    default:
      return state;
  }
};

export default orderReducer;
