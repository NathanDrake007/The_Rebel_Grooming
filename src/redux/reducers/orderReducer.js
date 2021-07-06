const initalState = {
  userId: null,
  orders: [],
};

const orderReducer = (state = initalState, action) => {
  switch (action.type) {
    case "PLACE_ORDER":
      return {};
    default:
      return state;
  }
};
export default orderReducer;
