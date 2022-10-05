import { useLocation, Outlet, Navigate } from "react-router-dom";

import useAuth from "./useAuth";

const RequireAuth = ({ roles }) => {
  const location = useLocation();

  const user = useAuth();

  return user && roles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;