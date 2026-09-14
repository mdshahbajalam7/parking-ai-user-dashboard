/* eslint-disable */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
import gobalReducer from "./slices/global";
// import chatReducer from "./slices/chat";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
export const productPersistConfig = {
  key: "global",
  storage,
  keyPrefix: "redux-",
  whitelist: ["location", "token", "txnId", "phoneNumber"],
};
const rootReducer = combineReducers({
  global: persistReducer(productPersistConfig, gobalReducer),
  // chats: chatReducer,
});

export default rootReducer;
