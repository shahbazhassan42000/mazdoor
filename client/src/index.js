import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./store/mazdoor/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import { useAuth } from "./Hooks/CustomHooks";
import { token } from "./utils/constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route errorElement={<Error />}>
        <Route path="/" element={token ? <Home /> : <Landing />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

