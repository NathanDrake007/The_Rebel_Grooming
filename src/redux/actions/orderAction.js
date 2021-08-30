import { firestore } from "../../utils/firebase";

export const placeOrder = (order) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const date = new Date().toDateString();
  const newOrder = {
    ...order,
    userId,
    date,
  };
  await firestore
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
