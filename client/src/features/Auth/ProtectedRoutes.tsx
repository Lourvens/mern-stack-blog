import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { APP_ROUTE } from "@/utils/constants";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={APP_ROUTE.LOGIN}
      state={{
        from: location.pathname,
      }}
    />
  );
}

export default ProtectedRoutes;
