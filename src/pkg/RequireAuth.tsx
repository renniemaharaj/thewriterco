import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCurrentToken } from "../app/api/auth/authSlice";

export const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);

  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};
