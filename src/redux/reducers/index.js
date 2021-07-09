import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
// import { firestoreReducer } from "redux-firestore";
// import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // firestore: firestoreReducer,
  // firebase: firebaseReducer,
});
