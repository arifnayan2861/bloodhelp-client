import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (user) {
    return children;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <Navigate to="/login" state={location.pathname} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.string,
};

export default PrivateRoute;
