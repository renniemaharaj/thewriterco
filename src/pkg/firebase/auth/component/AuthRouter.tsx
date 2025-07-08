import { Outlet } from "react-router-dom";
import Unauthenticated from "../../../page/views/Unauthenticated";
import useUserLikelySignedIn from "../hooks/useUserLikelySignedIn";

export const AuthRouter = () => {
  const { token } = useUserLikelySignedIn();
  return token ? <Outlet /> : <Unauthenticated />;
};
