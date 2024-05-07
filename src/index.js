import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Home from "./component/Home.jsx";
import "./css/style.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./store";
import "bootstrap-icons/font/bootstrap-icons.css";
// import dotenv from 'dotenv';
// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
