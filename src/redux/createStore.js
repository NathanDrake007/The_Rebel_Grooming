import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);
