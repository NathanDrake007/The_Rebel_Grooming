import { firestore } from "../../utils/firebase";

export const placeOrder = (order) => (dispatch, getState) => {
  const userId = getState().auth.userId;
  const timeStamp = new Date().toDateString();
  const newOrder = {
    ...order,
    userId,
    timeStamp,
  };
  firestore
    .collection("orders")
    .add(newOrder)
    .then((docRef) => {
      const _order = [
        ...getState().orders.orders,
        { ...newOrder, orderId: docRef.id },
      ];
      dispatch({
        type: "PLACE_ORDER",
        payload: _order,
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
