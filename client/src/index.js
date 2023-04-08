import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./store/mazdoor/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { HomePageRender } from "./components/HomePageRender";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route errorElement={<Error />}>
        <Route path="/" element={<HomePageRender/>} />
        <Route path="/dashboard"  element={<ProtectedRoute children={<Dashboard/>}/>}/>
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

