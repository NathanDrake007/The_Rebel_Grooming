import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
const configStorage = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

export default persistReducer(configStorage, rootReducer);
