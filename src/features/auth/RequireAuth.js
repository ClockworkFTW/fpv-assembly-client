import { useLocation, Outlet, Navigate } from "react-router-dom";

// Hooks
import useAuth from "hooks/useAuth";

const RequireAuth = ({ roles }) => {
  const location = useLocation();

  const user = useAuth();

  return user && roles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );
};

export default RequireAuth;
