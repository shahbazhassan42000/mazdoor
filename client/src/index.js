import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/mazdoor/store";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { HomePageRender } from "./components/HomePageRender";
import { EmailVerify } from "./components/Auth/EmailVerify";
import "react-notifications/lib/notifications.css";
import { CreateGig } from "./components/Dashboard/DashboardMain/CreateGig";
import { LaborProfile } from "./components/Labor/LaborProfile";
import { GigPreview } from "./components/Gig/GigPreview";
import { Gigs } from "./components/Gig/Gigs";
import { Inbox } from "./components/Chat/Inbox";
import { Orders } from "./components/Orders/Orders";
import { Users } from "./components/Admin/Users";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
    >
      <Route errorElement={<Error />}>
        <Route path="/" element={<HomePageRender />} />
        <Route path="/dashboard/:tab" element={<ProtectedRoute access="any" children={<Dashboard />} />} />
        <Route path="/dashboard/:tab/:id" element={<ProtectedRoute access="any" children={<Dashboard />} />} />
        <Route path="/dashboard/:tab/create-gig" element={<ProtectedRoute access="LABOR" children={<CreateGig />} />} />
        <Route path="/labor/:id" element={<ProtectedRoute access="any" children={<LaborProfile />} />} />
        <Route path="/gig/:id" element={<ProtectedRoute access="any" children={<GigPreview />} />} />
        <Route path="/gigs" element={<ProtectedRoute access="any" children={<Gigs />} />} />
        <Route path="/inbox" element={<ProtectedRoute access="any" children={<Inbox />} />} />
        <Route path="/inbox/:id" element={<ProtectedRoute access="any" children={<Inbox />} />} />
        <Route path="/orders" element={<ProtectedRoute access="any" children={<Orders />} />} />
        <Route path="/users/verification/:id/verify/:token" element={<EmailVerify />} />
        {/* Admin routes */}
        <Route path="/users" element={<ProtectedRoute access="ADMIN" children={<Users />} />} />

      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

