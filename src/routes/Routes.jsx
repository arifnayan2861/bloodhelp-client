import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import UserHome from "../pages/Dashboard/UserHome/UserHome";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
