import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import DashboardLayoutReducer from "./reducers/DashboardLayout";
import chattabReducer from "./reducers/chattab";
import HighlightLayoutReducer from "./reducers/HighLightRedux";

const authPersistConfig = { key: "auth", storage };
const dashboardLayoutPersistConfig = { key: "dashboardLayout", storage };
const chattabLPersistConfig = {key:"chattab",storage}
const highlightPersistConfig = {key: "highlightLayout", storage}
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboardLayout: persistReducer(
    dashboardLayoutPersistConfig,
    DashboardLayoutReducer
  ),
  chattab: persistReducer(
    chattabLPersistConfig,
    chattabReducer
  ),
  highlightLayout: persistReducer(
    highlightPersistConfig,
    HighlightLayoutReducer
  )
});

const syncConfig = {
  blacklist: ["persist/PERSIST"],
};
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, createStateSyncMiddleware(syncConfig)],
});
initMessageListener(store);
export default store;
export const persistor = persistStore(store);
