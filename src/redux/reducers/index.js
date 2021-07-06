import { combineReducers } from "redux";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  auth: authReducer,
  order: orderReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
