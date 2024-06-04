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
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest/EditDonationRequest";
import AdminHome from "../pages/Admin/AdminHome/AdminHome";
import AllUsers from "../pages/Admin/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AllBloodDonationRequests from "../pages/Admin/AllBloodDonationRequests/AllBloodDonationRequests";
import ContentManagement from "../pages/Admin/ContentManagement/ContentManagement";
import AddBlog from "../pages/Admin/AddBlog/AddBlog";

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
      //normal user routes
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-donation-request/:id",
        element: (
          <PrivateRoute>
            <EditDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyDonationRequest />
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
      //admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-requests",
        element: (
          <AdminRoute>
            <AllBloodDonationRequests />
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;
