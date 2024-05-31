import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import routes from "./routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);